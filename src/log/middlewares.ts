import { LogLevel, LogPackage, Middleware } from './type'

export function acceptLevels(acceptedLevels: LogLevel[]): Middleware {
    return {
        name: 'accept-levels',
        async run(log: LogPackage) {
            if (log.level in acceptedLevels) {
                return log;
            }

            return null;
        }
    };
}

export function ignoreLevels(ignoredLevels: LogLevel[]): Middleware {
    return {
        name: 'accept-levels',
        async run(log: LogPackage) {
            if (log.level in ignoredLevels) {
                return null;
            }

            return log;
        }
    };
}

export function toConsole(stringify: (log: LogPackage) => string): Middleware {
    return {
        name: 'to-console',
        async run(log: LogPackage) {
            console.log(stringify(log));
            return log;
        },
    };
}

export function toPostEndpoint(url: string): Middleware {
    return {
        name: 'to-post-endpoint',
        async run(log: LogPackage) {
            // No need to await
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(log),
            }).then(res => {
                if (res.status !== 200) {
                    console.warn(`Failed POST log to "${url}".`);
                }
            }).catch(e => {
                console.warn(`Failed POST log to "${url}". Reason: ${e}`);
            });

            return log;
        }
    };
}

export const timestamp: Middleware = {
    name: 'timestamp',
    async run(log: LogPackage) {
        return {
            ...log,
            metadata: {
                ...log.metadata,
                timestamp: Date.now(),
            },
        };
    }
}

export function stringifyStats(log: LogPackage): string {
    const msg = log.msg + ":\n" +
        Object.keys(log.metadata).map(key => ` ${key} = ${log.metadata[key]}`).join('\n');

    return msg;
}
