import * as express from 'express';
import { initTracer } from "jaeger-client";

const config = {
    'serviceName': 'management-coursera',
    'reporter': {
        'logSpans': true,
        'agentHost': 'localhost',
        'agentPort': 6832
    },
    'sampler': {
        'type': 'probabilistic',
        'param': 1.0
    }
};

const options = {
    'tags': {
        'management-coursera.version': '1.1.2'
    },
    //metrics; metrics
    //'logger': logger
};

const tracer = initTracer(config, options)

export const span = (name: string, req: express.Request, res: express.Response) => {
    return tracer.startSpan(name, { startTime: Date.now() }).addTags({
        "http.method": req.method,
        "http.path": req.route.path,
        "http.url": req.url,
        "http.status_code": res.statusCode
    })
}

export const exportTrace = (req: express.Request, res: express.Response, result: any, serverity: string = "info", spanName: string = "API-REQUESTS") => {
    span(spanName, req, res)
        .log({
            'log.severity': serverity,
            uri: req.url,
            payload: result
        }, Date.now())
        .finish(Date.now())
}