import express from "express"
import { EmployeeServiceImpl } from "../service/impl/employee.service.impl"
import { StatusCode } from "../domain/enums/statuscode.enum"

const service = new EmployeeServiceImpl()


export const findAll = async (req: express.Request, res: express.Response) => {
    try {
        return res.send(service.findAll())
    } catch (error: any) {
        return res.status(StatusCode.BAD_REQUEST).send({ "error": error.message })
    }
}

export const saveOne = async (req: express.Request, res: express.Response) => {
    try {
        return res.send(service.post(req.body))
    } catch (error: any) {
        return res.status(StatusCode.BAD_REQUEST).send({ "error": error.message })
    }
}