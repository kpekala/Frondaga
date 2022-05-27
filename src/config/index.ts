function requireDefined(value: string|undefined, errorMessage?: string): string {
    if (value === undefined) {
        throw new Error(errorMessage || 'Failed the require defined check.');
    }

    return value as string;
}

export const NODE_ENV = requireDefined(process.env.NODE_ENV) as ('development' | 'production');

export const SOCKET_URL = (() => {
    const url = requireDefined(process.env.SOCKET_URL, `SOCKET_URL is required`)
    if (url.startsWith('/')) {
        const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        return `${protocol}//${window.location.host}${url}`
    }
    return url;
})();


export const LOG_SERVER_PATH = (() => {
    const baseUrl = process.env.LOGGING_SERVER_BASEURL;
    const port = process.env.LOGGING_SERVER_PORT;

    if (baseUrl === undefined || port === undefined) {
        return null;
    }

    return `${baseUrl}:${port}`;
})();
