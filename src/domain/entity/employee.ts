import { Schema,model } from "mongoose";
import { DepartmentsValues } from "../enums/department.enum";

export class Employee {

    private id?: string
    private name: string
    private surname: string
    private department: DepartmentsValues
    private create_at: Date
    private birth_date: Date
    private update_at: Date

    constructor (id: string, name: string = "", surname: string = "", department: DepartmentsValues, create_at: Date, birth_date: Date, update_at: Date = new Date(Date.now())) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.department = department;
        this.create_at = create_at;
        this.birth_date = birth_date;
        this.update_at = update_at
    }

    getId() {
        return this.id
    }

    getName(): String {
        return this.name;
    }

    getSurname(): String {
        return this.surname
    }

    getDepartment(): DepartmentsValues {
        return this.department
    }

    getCreateDate(): Date {
        return this.create_at
    }

    getBirthDate(): Date {
        return this.birth_date
    }

    getUpdateDate(): Date {
        return this.update_at
    }
}

const employeeSchema = new Schema({
    name: String,
    surname: String,
    department: String,
    create_at: Date,
    birth_date: Date,
    update_at: Date
})

export const employee = model("Employee", employeeSchema)