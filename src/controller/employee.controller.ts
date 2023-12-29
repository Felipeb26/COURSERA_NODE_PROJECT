import { Router } from "express";
export const router = Router({ caseSensitive: false })

import { findAll, saveOne, } from "../routes/employee.routes";
import { Endpoint } from "../domain/enums/endpoint.enum";

router.get(Endpoint.EMPLOYEE, findAll)
router.post(Endpoint.EMPLOYEE, saveOne)
// router.get("/t", teste)


