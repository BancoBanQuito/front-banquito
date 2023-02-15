import axios from "axios";
import { GET_CLIENTS_BY_LASTNAME, GET_CLIENT_ATM, GET_CLIENT_BY_EMAIL, GET_CLIENT_BY_ID, GET_CLIENT_BY_ID_AND_IDENTIFICATION_TYPE, GET_CLIENT_SIGNATURE, POST_CLIENT, POST_CLIENT_LOGIN, POST_CLIENT_SIGNUP, PUT_CLIENT_ADDRESS, PUT_CLIENT_BY_ID, PUT_CLIENT_BY_USER_ID, PUT_CLIENT_PERSONAL_DATA, PUT_CLIENT_PHONE, PUT_CLIENT_REFERENCE } from "../../config/apis/clientAPI";
import { ClientRQ } from "./dto/ClientRQ";
import { UpdateClientRQ } from "./dto/UpdateClientRQ";
import { UpdateReferenceRQ } from "./dto/UpdateReferenceRQ";
import { UpdatePhoneRQ } from "./dto/UpdatePhoneRQ";
import { PersonalClientDataRSRQ } from "./dto/PersonalClientDataRSRQ";
import { UpdateAddressRQ } from "./dto/UpdateAddressRQ";
import { NewClientRQ } from "./dto/NewClientRQ";
import { UserRQ } from "./dto/UserRQ";
import { UserLogin } from "./dto/UserLogin";
import { ClientRS } from "./dto/ClientRS";
import { SignatureRQ } from "./dto/SignatureRQ";

export class ClientService {

    public static async putClientById(id: string, body: ClientRQ) {
        try {
            return (await axios.put<string>(PUT_CLIENT_BY_ID(id), body)).data;
        } catch (error: any) {
            throw error;
        }
    }

    public static async putClientByUserId(id: string, body: UpdateClientRQ) {
        try {
            return (await axios.put<string>(PUT_CLIENT_BY_USER_ID(id), body)).data;
        } catch (error: any) {
            throw error;
        }
    }

    public static async putClientReference(body: UpdateReferenceRQ) {
        try {
            return (await axios.put<string>(PUT_CLIENT_REFERENCE(), body)).data;
        } catch (error: any) {
            throw error;
        }
    }

    public static async putClientPhone(body: UpdatePhoneRQ) {
        try {
            return (await axios.put<string>(PUT_CLIENT_PHONE(), body)).data;
        } catch (error: any) {
            throw error;
        }
    }

    public static async putClientPersonalData(body: PersonalClientDataRSRQ) {
        try {
            return (await axios.put<string>(PUT_CLIENT_PERSONAL_DATA(), body)).data;
        } catch (error: any) {
            throw error;
        }
    }

    public static async putClientAddress(body: UpdateAddressRQ) {
        try {
            return (await axios.put<string>(PUT_CLIENT_ADDRESS(), body)).data;
        } catch (error: any) {
            throw error;
        }
    }

    public static async postClient(body: NewClientRQ) {
        try {
            return (await axios.post<string>(POST_CLIENT(), body)).data;
        } catch (error: any) {
            throw error;
        }
    }

    public static async postClientSignUp(body: UserRQ) {
        console.log(body);
        try {
            return (await axios.post<string>(POST_CLIENT_SIGNUP(), body)).data;
        } catch (error: any) {
            throw error;
        }
    }

    public static async postClientLogin(body: UserLogin) {
        try {
            return (await axios.post<any>(POST_CLIENT_LOGIN(), body)).data;
        } catch (error: any) {
            throw error;
        }
    }

    public static async getClientByIdAndIdentificationType(id: string, identificationType: string) {
        try {
            return (await axios.get<ClientRS>(GET_CLIENT_BY_ID_AND_IDENTIFICATION_TYPE(id, identificationType))).data;
        } catch (error: any) {
            throw error;
        }
    }

    public static async getClientSignatureByIdAndIdentificationType(id: string, identificationType: string) {
        try {
            return (await axios.get<SignatureRQ>(GET_CLIENT_SIGNATURE(id, identificationType))).data;
        } catch (error: any) {
            throw error;
        }
    }

    public static async getClientByEmail(email: string) {
        try {
            return (await axios.get<PersonalClientDataRSRQ>(GET_CLIENT_BY_EMAIL(email))).data;
        } catch (error: any) {
            throw error;
        }
    }

    public static async getClientsByLastname(lastname: string) {
        try {
            return (await axios.get<ClientRS[]>(GET_CLIENTS_BY_LASTNAME(lastname))).data;
        } catch (error: any) {
            throw error;
        }
    }

    public static async getClientPersonalDataById(id: string) {
        try {
            return (await axios.get<PersonalClientDataRSRQ>(GET_CLIENT_BY_ID(id))).data;
        } catch (error: any) {
            throw error;
        }
    }

    public static async getClientATM(id: string) {
        try {
            return (await axios.get<ClientRS>(GET_CLIENT_ATM(id))).data;
        } catch (error: any) {
            throw error;
        }
    }




    public static async logClient(username: string, password: string) {
        try {
            return axios.post(POST_CLIENT_LOGIN(), { userName: username, password: password });
        } catch (error: any) {
            throw error;
        }
    }
}