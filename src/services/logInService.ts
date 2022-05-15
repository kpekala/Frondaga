export const LogInService = (() => {
    let username: string|null = null;

    return {
        setUsername(name: string) {
            username = name;
        },

        getUserName() {
            return username;
        }
    };
})();

