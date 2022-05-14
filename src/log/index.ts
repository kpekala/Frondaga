import { LogLevel, LogPackage, Middleware } from './type';

export const Logger = (() => {
    const middlewares: Middleware[] = [];

    return {
        use(middleware: Middleware) {
            middlewares.push(middleware);
        },

        async log(level: LogLevel, msg: string): Promise<void> {
            let logPackage: LogPackage|null = {
                level,
                msg,
                metadata: {},
            };

            let middlewareIdx = 0;

            while (logPackage !== null && middlewares[middlewareIdx]) {
                logPackage = await middlewares[middlewareIdx].run(logPackage);
                middlewareIdx++;
            }
        },

        debug(msg: string): Promise<void> {
            return this.log('debug', msg);
        },

        warn(msg: string): Promise<void> {
            return this.log('warn', msg);
        },

        error(msg: string): Promise<void> {
            return this.log('error', msg);
        },

        info(msg: string): Promise<void> {
            return this.log('info', msg);
        },

    };
})();

export const Stats = (() => {
    const middlewares: Middleware[] = [];
    const values = new Map<string, string>();
    let throttle = 1000;

    let timeoutHandle: number|null = null;

    const sendStats = async () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const metadata: any = {};

        for (const key of values.keys()) {
            metadata[key] = values.get(key);
        }

        let logPackage: LogPackage|null = {
            level: 'info',
            msg: 'Stats',
            metadata,
        };

        let middlewareIdx = 0;

        while (logPackage !== null && middlewares[middlewareIdx]) {
            logPackage = await middlewares[middlewareIdx].run(logPackage);
            middlewareIdx++;
        }
    };

    return {
        setThrottle(ms: number): void {
            throttle = ms;
        },

        use(middleware: Middleware) {
            middlewares.push(middleware);
        },

        set(key: string, value: string) {
            values.set(key, value);

            if (timeoutHandle === null) {
                timeoutHandle = window.setTimeout(() => {
                    timeoutHandle = null;

                    sendStats();
                }, throttle);
            }
        },
    };
})();
