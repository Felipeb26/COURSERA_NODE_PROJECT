import express from "express"
import { EmployeeServiceImpl } from "../service/impl/employee.service.impl"
import { StatusCode } from "../domain/enums/statuscode.enum"
import { Avoid } from "../helper/avoid.helper"

const service = new EmployeeServiceImpl()

export const findAllDepartments = async (req: express.Request, res: express.Response) => {
    try {
        const result = await service.getAllDepartments()
        return res.status(StatusCode.OK).send(result)
    } catch (error: any) {
        return res.status(StatusCode.BAD_REQUEST).send({ "error": error.message })
    }
}

export const findAll = async (req: express.Request, res: express.Response) => {
    try {
        const result = await service.findAll()
        return res.status(StatusCode.OK).send(result)
    } catch (error: any) {
        return res.status(StatusCode.BAD_REQUEST).send({ "error": error.message })
    }
}

export const findById = async (req: express.Request, res: express.Response) => {
    try {
        const avoid = new Avoid<string>()

        const result = await service.findById(avoid.exceptionOnUndefined(req.params["id"]))
        return res.status(StatusCode.OK).send(result)
    } catch (error: any) {
        return res.status(StatusCode.BAD_REQUEST).send({ "error": error.message })
    }
}

export const save = async (req: express.Request, res: express.Response) => {
    try {
        const result = await service.post(req.body)
        return res.status(StatusCode.CREATED).send(result)
    } catch (error: any) {
        return res.status(StatusCode.BAD_REQUEST).send({ "error": error.message })
    }
}

export const update = async (req: express.Request, res: express.Response) => {
    try {
        const avoid = new Avoid<string>()

        const result = await service.update(avoid.exceptionOnUndefined(req.params["id"]), req.body)
        return res.status(StatusCode.ACEPTED).send(result)
    } catch (error: any) {
        return res.status(StatusCode.BAD_REQUEST).send({ "error": error.message })
    }
}

export const deleteById = async (req: express.Request, res: express.Response) => {
    try {
        const avoid = new Avoid<string>()
        const { id } = req.query

        const result = await service.deleteById(avoid.exceptionOnUndefined(id))
        return res.status(StatusCode.OK).send({ message: result })
    } catch (error: any) {
        return res.status(StatusCode.BAD_REQUEST).send({ "error": error.message })
    }
}