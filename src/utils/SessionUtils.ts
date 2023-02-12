enum SessionVariable {
    USERNAME = 'username',
    LOGGED = 'isLogged',
    IDENTIFICATION = 'identification',
    IDENTIFICATION_TYPE = 'identificationType',
    ROLE = 'role'
}


const getSession = (key: string) => {
    return sessionStorage.getItem(key);
}

const setSession = (key: string, value: string) => {
    sessionStorage.setItem(key, value);
}

const removeSession = (key: string) => {
    sessionStorage.removeItem(key);
}

export { SessionVariable, getSession, setSession, removeSession };