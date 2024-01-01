import { Schema, model } from "mongoose";
import { DepartmentsValues } from "../enums/department.enum";

export class Employee {

    private name: string;
    private surname: string;
    private email: string;
    private department: DepartmentsValues;
    private create_at: Date;
    private birth_date: Date;
    private update_at: Date;

    constructor (name: string = "", surname: string = "", email: string = "",
        department: DepartmentsValues, birth_date: Date, create_at: Date = new Date(Date.now()), update_at: Date = new Date(Date.now())) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.department = department;
        this.create_at = update_at == null ? new Date(Date.now()) : create_at;
        this.birth_date = birth_date;
        this.update_at = update_at
    }

    getName(): String {
        return this.name;
    }

    getSurname(): String {
        return this.surname
    }

    getEmail(): String {
        return this.email
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
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    create_at: {
        type: Date,
        required: true
    },
    birth_date: Date,
    update_at: {
        type: Date,
        required: true
    },
})

export const EmployeeModel = model("Employee", employeeSchema)


export const messageErrors = () => {
    return ["Name must not be null", "surname must not be null", "email must not be null", "birth date must not be null","department must not be null"]
}