function requireDefined(value: string|undefined): string {
    if (value === undefined) {
        throw new Error('Failed the require defined check.');
    }

    return value as string;
}

export const NODE_ENV = requireDefined(process.env.NODE_ENV) as ('development' | 'production');

export const LOG_SERVER_PATH = (() => {
    const baseUrl = process.env.LOGGING_SERVER_BASEURL;
    const port = process.env.LOGGING_SERVER_PORT;

    if (baseUrl === undefined || port === undefined) {
        return null;
    }

    return `${baseUrl}:${port}`;
})();
