import { setServers } from "dns";
import { ClientService } from "../services/client/clientService";
import { SessionVariable, getSession, removeSession, setSession } from "./SessionUtils";

const LOGGED = 'logged';

type UserType = 'client' | 'user' | 'atm';

const login = async (email: string, password: string) => {
    try {
        await ClientService.logClient(email, password);
        console.log("Flag");
        const response = (await ClientService.getClientByEmail(email)).data;
        setSession(SessionVariable.USERNAME, response.email);
        setSession(SessionVariable.IDENTIFICATION, response.identification);
        setSession(SessionVariable.IDENTIFICATION_TYPE, response.identificationType);
        setSession(SessionVariable.LOGGED, LOGGED);
        return response;
    } catch (error: any) {
        removeSession(SessionVariable.LOGGED);
        throw error;
    }
}

const logout = () => {
    removeSession(SessionVariable.USERNAME);
    removeSession(SessionVariable.IDENTIFICATION);
    removeSession(SessionVariable.IDENTIFICATION_TYPE);
    removeSession(SessionVariable.LOGGED);
}

const isLogged = (): boolean => {
    return getSession(SessionVariable.LOGGED) == LOGGED;
}

export { login, logout, isLogged };
export type { UserType };
