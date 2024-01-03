import compression from "compression"
import cors from "cors"
import express from "express"
import expressWinston from "express-winston"
import responseTime from "response-time"
import { format, transports } from "winston"
import { router } from "../controller/employee.controller"
import { restResponseTimeHistogram, traceRoute } from "./prometheus.middleware"
import { span } from "./jaeger.middleware"

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
        new transports.File({
            filename: "management.log"
        }),
        new transports.Console({ level: "info" })
    ],
    format: format.combine(
        format.json(),
        format.timestamp(),
        format.prettyPrint()
    ),
    statusLevels: true
}))


app.use(router)
app.use(traceRoute)

app.use(responseTime((req: express.Request, res: any, time: number) => {
    if (req?.route?.path) {
        restResponseTimeHistogram.observe({
            "route": req.route,
            "method": req.method,
            "status_code": res.statusCode
        }, time * 1000)
        span("response-time", req, res)
            .log({
                'log.severity': 'info',
                uri: req.url,
                payload: res.body
            }, Date.now())
            .finish(Date.now())
    }
}))
