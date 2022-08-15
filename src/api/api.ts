import axios from "axios";

const instance = axios.create({
    baseURL : "https://social-network.samuraijs.com/api/1.0/",
    withCredentials: true,
    headers: {
        "API-KEY": "8167777a-ea65-4ab7-8aca-994fc49b12df"
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
        return instance.post(`follow/${userId}`)
    },
    unfollow (userId:number){
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
    savePhoto(photoFile:any) {
        const formData = new FormData();
        formData.append("image", photoFile);
        return instance.put(`profile/photo`, formData, {
            headers: {'Content-Type': 'multipart/form-data'}
        });
    }
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


