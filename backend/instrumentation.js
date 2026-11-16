import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import dotenv from "dotenv"
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-http';
import { PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';
import { resourceFromAttributes } from '@opentelemetry/resources';
dotenv.config();

const collectorUrl = (
  process.env.OTEL_EXPORTER_OTLP_ENDPOINT || 'http://localhost:4318'
).replace(/\/$/, '');

const traceExporter = new OTLPTraceExporter({
  url: `${collectorUrl}/v1/traces`,
});
const metricExporter = new OTLPMetricExporter({
  url: `${collectorUrl}/v1/metrics`,
});

const sdk = new NodeSDK({
  resource: resourceFromAttributes({
    'service.name': 'perfume-store-api',
  }),

  traceExporter,

  metricReader: new PeriodicExportingMetricReader({
    exporter: metricExporter,
    exportIntervalMillis: 10000,
  }),


  instrumentations: [
    getNodeAutoInstrumentations({
  '@opentelemetry/instrumentation-fs': { enabled: false },
  '@opentelemetry/instrumentation-dns': { enabled: false },
  '@opentelemetry/instrumentation-net': { enabled: false },
  '@opentelemetry/instrumentation-pg': {
    requestHook: (span, queryInfo) => {
      const op = queryInfo?.query?.text?.trim().split(/\s+/)[0]?.toUpperCase();
      if (op) span.setAttribute('db.operation.name', op);
    },
  },
}),
  ],
});

sdk.start();

console.log('OpenTelemetry initialized: perfume-store-api');

process.on('SIGTERM', () => {
  sdk.shutdown().catch((error) => {
    console.error('OpenTelemetry shutdown error:', error);
  });
});
