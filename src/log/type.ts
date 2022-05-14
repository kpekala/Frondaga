export type LogLevel =
    'debug' |
    'warn'  |
    'error' |
    'info';

export interface LogPackage {
    level: LogLevel;
    msg: string;
    metadata: {[key: string]: unknown};
}

export interface Middleware {
    name: string;
    run(log: LogPackage): Promise<LogPackage|null>;
}
