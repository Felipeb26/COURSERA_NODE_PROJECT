import { DiagConsoleLogger, DiagLogLevel, diag, trace } from '@opentelemetry/api';
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { B3Propagator } from "@opentelemetry/propagator-b3";
import { Resource } from '@opentelemetry/resources';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';


diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.INFO);

const traceExporter = new OTLPTraceExporter({
    url: "http://localhost:9411/spans"
})

export const getTracer = () => {
    return trace.getTracer("default")
}

const sdk = new NodeSDK({
    resource: new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]: "MANAGEMENT",
        [SemanticResourceAttributes.SERVICE_VERSION]: "1.0.0"
    }),
    spanProcessor: new SimpleSpanProcessor(traceExporter),
    traceExporter: traceExporter,
    instrumentations: [new HttpInstrumentation()],
    textMapPropagator: new B3Propagator()
})

sdk.start();

process.on('SIGTERM', () => {
    sdk.shutdown()
        .then(() => console.log('SDK shut down successfully'))
        .catch((err) => console.log(`Error shutting down SDK, ${err}`))
        .finally(() => process.exit(0))
})