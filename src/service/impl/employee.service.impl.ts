import { ObjectId } from "mongodb";
import { connect } from "../../config/database/connect.database";
import { Employee, messageErrors } from "../../domain/model/employee.model";
import { Avoid } from "../../helper/avoid.helper";
import { departments } from './../../domain/enums/department.enum';

const EMPLOYEE_COLLECTION = connect("employee")

export class EmployeeServiceImpl<EmployeeModel> implements CrudService<EmployeeModel>{

    async getAllDepartments() {
        return departments
    }

    async findAll() {
        const databse = await EMPLOYEE_COLLECTION
        return databse.find({}).toArray();
    }

    async findById(id: number | string | ObjectId) {
        const db = await EMPLOYEE_COLLECTION

        let result
        if (id instanceof ObjectId) {
            result = await db.findOne({ _id: id })

        } else {
            result = await db.findOne({ _id: new ObjectId(id) })
        }

        if (!result) {
            throw new Error('User not found.');
        }
        return result
    }

    async post(body: any) {
        const db = await EMPLOYEE_COLLECTION
        const avoid = new Avoid<void>()

        const { name, surname, email, birth_date, department } = body
        avoid.validArray([name, surname, email, birth_date, department], messageErrors())

        const sameEmail = await db.findOne({ email: email })
        if (sameEmail) {
            throw new Error("Email already been used!")
        }

        this.compareEnum(department)

        const document = new Employee(name, surname, email, department, birth_date)
        const result = await db.insertOne(document)

        return this.findById(result.insertedId)
    }

    async update(id: number | string | ObjectId, body: any) {
        const db = await EMPLOYEE_COLLECTION
        const avoid = new Avoid<void>()

        id = id instanceof ObjectId ? id : new ObjectId(id)

        const document = await this.findById(id)
        const { name, surname, email, birth_date, department } = body

        const sameEmail = await db.findOne({ email: email })
        if (sameEmail) {
            if (!sameEmail._id.equals(id))
                throw new Error("Email already been used!")
        }
        this.compareEnum(department)

        const newDocument = new Employee(avoid.nullOrUndefined(name, document.name), avoid.nullOrUndefined(surname, department.surname),
            avoid.nullOrUndefined(email, department.email), avoid.nullOrUndefined(department, document.department),
            avoid.nullOrUndefined(birth_date, document.birth_date), document.creat_at)

        const result = await db.updateOne({ _id: id }, { $set: newDocument }, { upsert: true })
        return result
    }

    async deleteById(id: number | string) {
        const db = await EMPLOYEE_COLLECTION
        const result = await db.deleteOne({ _id: new ObjectId(id) })
        return this.codeToMessage(result.deletedCount)
    }


    private compareEnum(value: any) {
        const types = [departments.GENERAL_DENTISTRY, departments.ORTHODONTICS, departments.PEDIATRIC_DENTISTRY, departments.RESTORATIVE_DENTISTRY, departments.SURGERY]

        const find = types.find((it: departments) => it == value)
        if (!find) {
            throw new Error(`Not found specific department ${value}`)
        }
    }

    private codeToMessage(value: Number | String) {
        if (value instanceof Number) {
            if (value == 0)
                throw new Error("Houve um erro em relacao ao pedido atual")
            else return "O pedido foi atendido com sucesso"
        } else {
            value = new String(value).trim()
            if (value.startsWith("0"))
                throw new Error("Houve um erro em relacao ao pedido atual")
            else return "O pedido foi atendido com sucesso"
        }
    }
}