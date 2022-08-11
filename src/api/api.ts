import axios from "axios";

const instance = axios.create({
    baseURL : "https://social-network.samuraijs.com/api/1.0/",
    withCredentials: true,
    headers: {
        "API-KEY": "f4beecb6-4c5c-46be-adeb-1e70b1a2b643"
    }
});

export const usersApi = {
    requestUsers (currentPage: number, pageSize: number) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            });
    },
    follow (userId:number){
        debugger
        return instance.post(`follow/${userId}`)
    },
    unfollow (userId:number){
        debugger
        return instance.delete(`follow/${userId}`)
    },
    getProfile(userId:number) {
        console.warn('Use profileApi object')
        return profileApi.getProfile(userId)
    }
}

export const profileApi = {
    getProfile(userId:number) {
        return instance.get(`profile/`+ userId)
    },
    getStatus(userId:number){
        return instance.get(`profile/status/`+ userId)
    },
    updateStatus(status: string){
        return instance.put(`profile/status/`, {status:status} )
    },
}

export const authApi = {
    me() {
        return instance.get(`auth/me`)
    },
    login(email: string,password: string, rememberMe = false) {
        return instance.post(`auth/login`, {email, password, rememberMe})
    },
    logout() {
        return instance.delete(`auth/login`)
    },
}


