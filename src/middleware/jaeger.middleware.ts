import { initTracer } from "jaeger-client";


const PrometheusMetricsFactory = require('jaeger-client').PrometheusMetricsFactory;
const promClient = require('prom-client');

const config = {
    serviceName: 'my-awesome-service',
};
const namespace = config.serviceName;
const metrics = new PrometheusMetricsFactory(promClient, namespace);
const options = {
    metrics: metrics,
};

export const jaeger = initTracer(config, options);

