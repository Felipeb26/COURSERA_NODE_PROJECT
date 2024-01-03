import { exportTrace } from "../middleware/jaeger.middleware"
import express from "express"
import client from "prom-client"
import { StatusCode } from "../domain/enums/statuscode.enum"

export const traceRoute = express.Router()

export const restResponseTimeHistogram = new client.Histogram({
    name: "rest_response_time_duration_seconds",
    help: "Rest API response time in seconds",
    labelNames: ["method", "route", "status_code"]
})

const databaseResponseTimeHistogram = new client.Histogram({
    name: "db_response_time_in_duration_seconds",
    help: "Database Metrics response time in seconds",
    labelNames: ["operation", "sucess"]
})



const collectDefaultMetrics = client.collectDefaultMetrics
collectDefaultMetrics()


traceRoute.get("/metrics", async (req, res) => {
    res.set("Contenty-Type", client.register.contentType)
    const metrics = await client.register.metrics()
    exportTrace(req, res, metrics, "info", "METRICS")
    return res.status(StatusCode.OK).send(metrics)
})
