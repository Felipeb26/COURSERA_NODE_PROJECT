import { connect } from "../../config/database/connect.database";

import { employee } from "../../domain/entity/employee";

const employeeDb = connect("employee")

export class EmployeeServiceImpl<employee> implements CrudService<employee> {

    async findAll(): Promise<employee[]> {
        const data = await employee.find({})
        console.log(data)
        throw new Error('Method not implemented.');
    }

    async post(body: employee): Promise<employee> {
        const db = await employeeDb

        const document = { "name": "felipes", "surname": "batista", "birth_date": "26/04/01" }
        const result = await db.insertOne(document)
        console.log(result)
        throw new Error('Method not implemented.');
    }

    async findById(id: Number): Promise<employee> {
        throw new Error('Method not implemented.');
    }

    async update(id: Number, employee: employee): Promise<employee> {
        throw new Error('Method not implemented.');
    }

    async deleteById(id: Number): Promise<void> {
        throw new Error('Method not implemented.');
    }

}

