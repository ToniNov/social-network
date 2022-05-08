import axios from "axios";

const instance = axios.create({
    baseURL : "https://social-network.samuraijs.com/api/1.0/",
    withCredentials: true,
    headers: {
        "API-KEY": "f4beecb6-4c5c-46be-adeb-1e70b1a2b643"
    }
});

export const usersApi = {
    getUsers (currentPage: number, pageSize: number) {
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
        return instance.get(`profile/`+ userId)
    }
}

export const authApi = {
    me() {
        return instance.get(`auth/me`)
    }
}


