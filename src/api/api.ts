import axios from "axios";
import {UserType} from "../types/types";

export const instance = axios.create({
    baseURL : "https://social-network.samuraijs.com/api/1.0/",
    withCredentials: true,
    headers: {
        "API-KEY": "8167777a-ea65-4ab7-8aca-994fc49b12df"
    }
});

export enum ResultCodesEnum {
    Success = 0,
    Error = 1
}

export enum ResultCodeCaptchaEnum {
    CaptchaIsRequired = 10
}

export type GetItemsType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}
export type APIResponseType<D = {}, RC = ResultCodesEnum > = {
    data: D
    messages: Array<string>
    fieldsErrors?: Array<string>
    resultCode: RC
}





