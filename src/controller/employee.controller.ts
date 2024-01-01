import { Router } from "express";
export const router = Router({ caseSensitive: false })

import { findAll, save, findById, update, deleteById } from "../routes/employee.routes";
import { Endpoint } from "../domain/enums/endpoint.enum";

router.get(Endpoint.EMPLOYEE, findAll)
router.get(Endpoint.EMPLOYEE+"/:id", findById)
router.post(Endpoint.EMPLOYEE, save)
router.put(Endpoint.EMPLOYEE+"/:id", update)
router.delete(Endpoint.EMPLOYEE, deleteById)
