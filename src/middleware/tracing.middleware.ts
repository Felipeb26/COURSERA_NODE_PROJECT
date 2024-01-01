import express from "express"
import client from "prom-client"

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

    return res.send(await client.register.metrics())
})
