import pino from "pino";
import type { Logger, LoggerOptions } from "pino";

type CreateLoggerOptions = LoggerOptions & {
    name: string;
};

export const createLogger = (options: CreateLoggerOptions): Logger => {
    const { name, ...rest } = options;
    const transport =
        process.env.NODE_ENV === "development"
        ? {
            target: "pino-pretty",
            options: {
                colorize: true,
                translateTime: "SYS:standard",
                singleLine: false,        // keep each field on its own line
                ignore: "pid,hostname",   // reduce noise, nothing gets hidden
            },
        }
        : undefined;

    return pino({
        name,
        level: process.env.LOG_LEVEL || "info",
        transport,
        serializers: {
            // Prevent pino from truncating deeply nested objects
            req: pino.stdSerializers.req,
            res: pino.stdSerializers.res,
            err: pino.stdSerializers.err,
        },
        ...rest,
    });
};