import axios from "axios";
import { PUT_ACCOUNT_SIGNATURE_API, POST_ACCOUNT_SIGNATURE_API, GET_ACCOUNT_SIGNATURE_API, GET_ACCOUNT_SIGNATURE_CODE_API } from "../../config/apis/accountAPI";
import { ResponseFormat } from "../ResponseFormat";
import { RQSignature } from "./dto/RQSignature";
import { RQSignatureRoleStatus } from "./dto/RQSignatureRoleStatus";
import { RSSignature } from "./dto/RSSignature";

export class AccountSignatureService {
  public static async putAccountSignature(identificationType: string, identification: string, codeLocalAccount: string, body: RQSignatureRoleStatus) {
    try {
      return await axios.put<ResponseFormat<string>>(PUT_ACCOUNT_SIGNATURE_API(identificationType, identification, codeLocalAccount), body);
    } catch (error) {
      throw error;
    }
  }

  public static async postAccountSignature(accountSignature: RQSignature) {
    try {
      return await axios.post<ResponseFormat<string>>(POST_ACCOUNT_SIGNATURE_API(), accountSignature);
    } catch (error) {
      throw error;
    }
  }

  public static async getAccountSignature(identificationType: string, identification: string) {
    try {
      return await axios.get<ResponseFormat<RSSignature[]>>(GET_ACCOUNT_SIGNATURE_API(identificationType, identification));
    } catch (error) {
      throw error;
    }
  }

  public static async getAccountSignatureByCode(codeLocalAccount: string) {
    try {
      return await axios.get<ResponseFormat<RSSignature[]>>(GET_ACCOUNT_SIGNATURE_CODE_API(codeLocalAccount));
    } catch (error) {
      throw error;
    }
  }
}
