import {APIResponseType, instance, ResultCodeCaptchaEnum, ResultCodesEnum} from "./api";

type MeResponseDataType = {
    id:number
    email: string
    login: string
}

type LoginResponseDataType = {
    id:number
}

export const authApi = {
    me() {
        return instance.get<APIResponseType<MeResponseDataType>>(`auth/me`).then(res => res.data)
    },
    login(email: string,password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<APIResponseType<LoginResponseDataType, ResultCodesEnum | ResultCodeCaptchaEnum>>(`auth/login`,
            {email, password, rememberMe, captcha})
            .then(res => res.data)
    },
    logout() {
        return instance.delete<APIResponseType<{}>>(`auth/login`)
            .then(res => res.data)
    },
}

