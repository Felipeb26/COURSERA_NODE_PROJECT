import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { JaegerExporter } from "@opentelemetry/exporter-jaeger"
import { registerInstrumentations } from "@opentelemetry/instrumentation"
import { ExpressInstrumentation } from "@opentelemetry/instrumentation-express"
import { HttpInstrumentation } from "@opentelemetry/instrumentation-http"
import { OTTracePropagator } from "@opentelemetry/propagator-ot-trace"
import { Resource } from "@opentelemetry/resources"
import { NodeTracerProvider } from "@opentelemetry/sdk-trace-node"
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions"
import { BatchSpanProcessor } from "@opentelemetry/sdk-trace-base"



const init = (serviceName: string, environment: string = "production") => {

    // User Collector Or Jaeger Exporter
    //const exporter = new CollectorTraceExporter(options)

    const exporter = new OTLPTraceExporter({url: ""})

    const provider = new NodeTracerProvider({
        resource: new Resource({
            [SemanticResourceAttributes.SERVICE_NAME]: serviceName, // Service name that showuld be listed in jaeger ui
            [SemanticResourceAttributes.DEPLOYMENT_ENVIRONMENT]: environment,
        }),
    })

    //provider.addSpanProcessor(new SimpleSpanProcessor(exporter))

    // Use the BatchSpanProcessor to export spans in batches in order to more efficiently use resources.
    provider.addSpanProcessor(new BatchSpanProcessor(exporter))

    // Enable to see the spans printed in the console by the ConsoleSpanExporter
    // provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()))

    provider.register({ propagator: new OTTracePropagator() })

    console.log("tracing initialized")

    registerInstrumentations({
        instrumentations: [new ExpressInstrumentation(), new HttpInstrumentation()],
    })

    const tracer = provider.getTracer(serviceName)
    return { tracer }
}

export default init