import compression from "compression"
import cors from "cors"
import express from "express"
import expressWinston from "express-winston"
import { format, transports } from "winston"
import { router } from "../controller/employee.controller"

export const app = express()

app.use(cors())
app.use(compression({
    level: 9
}))
app.use(express.json())
app.use(expressWinston.logger({
    transports: [
        new transports.File({
            level: "error",
            filename: "coursera.error.log"
        }),
        new transports.Console({
            level: "error"
        })
    ],
    format: format.combine(
        format.json(),
        format.timestamp(),
        format.prettyPrint()
    ),
    statusLevels: true
}))

app.use(router)