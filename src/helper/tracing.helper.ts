import process from "process"
import opentelemtry from "@opentelemetry/sdk-node"
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node"
import { ConsoleSpanExporter } from "@opentelemetry/sdk-trace-base"
import { Resource } from "@opentelemetry/resources"
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions"

const traceExporter = new ConsoleSpanExporter();
const sdk = new opentelemtry.NodeSDK({
    resource: new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]: "COURSERA NODE",
    }),
    traceExporter: traceExporter,
    instrumentations: [getNodeAutoInstrumentations()]
})

sdk.start()

process.on("SIGTERM", () => {
    sdk.shutdown().then(() => console.log("Tracing terminated"))
    .catch((error:any) => console.log("error on finishi", error))
    .finally(() => process.exit(0))
})