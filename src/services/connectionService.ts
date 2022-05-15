export const connectionService = (() => {
    let address = 'http://localhost:9000';
    let server = new WebSocket('http://localhost:9000');

    server.onopen = () => { return 1; };
    server.onerror = () => { return 1; };
    server.onclose = () => { return 1; };

    return {
        setAddress(newAddress: string) { address = newAddress; }

    };
})();