import AccountStatementJSON from "./accountStatement.json";
import { AccountStament } from "./model/AccountStatement";

export class AccountStatementService {

    public static async getStatements(accountCode: string) {
        return AccountStatementJSON.filter(data => data.accountCode === accountCode);
    }

}