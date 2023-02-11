import axios from "axios";
import { DELETE_BRANCH_BY_NAME, GET_BRANCH, GET_BRANCH_BY_NAME, GET_BRANCH_NAME_LIKE, POST_BRANCH, PUT_BRANCH_BY_NAME } from "../../config/apis/settingAPI";
import { BranchRQ } from "./dto/BranchRQ";

export class BranchService {
    public static async getBranchByName(name: string) {
        try {
            return (await axios.get<any>(GET_BRANCH_BY_NAME(name))).data;
        } catch (error: any) {
            throw error;
        }
    }

    public static async putBranchByName(name: string, body: BranchRQ) {
        try {
            return (await axios.put<any>(PUT_BRANCH_BY_NAME(name), body)).data;
        } catch (error: any) {
            throw error;
        }
    }

    public static async deleteBranchByName(name: string) {
        try {
            return (await axios.delete<any>(DELETE_BRANCH_BY_NAME(name))).data;
        } catch (error: any) {
            throw error;
        }
    }

    public static async getBranch() {
        try {
            return (await axios.get<any>(GET_BRANCH())).data;
        } catch (error: any) {
            throw error;
        }
    }

    public static async postBranch(body: BranchRQ) {
        try {
            return (await axios.post<any>(POST_BRANCH(), body)).data;
        } catch (error: any) {
            throw error;
        }
    }

    public static async getBranchByNameLike(name: string) {
        try {
            return (await axios.get<any>(GET_BRANCH_NAME_LIKE(name))).data;
        } catch (error: any) {
            throw error;
        }
    }
}