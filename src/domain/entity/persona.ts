import { DEPARTMENTS } from "../enums/department.enum"

export class Persona {

    private name: string
    private surname: string
    private department: DEPARTMENTS

    constructor (name: string = "", surname: string = "", department: DEPARTMENTS) {
        this.name = name
        this.surname = surname
        this.department = department
    }


    getName(): String {
        return this.name;
    }

    getSurname(): String {
        return this.surname
    }

    getDepartment(): DEPARTMENTS {
        return this.department
    }

}