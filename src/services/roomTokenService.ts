export const roomTokenService = (() => {
    let token: string | null = null;

    return {
        setToken(newToken: string) {
            token = newToken;
        },

        getToken() {
            return token;
        }
    };
})();

