import {APIResponseType, instance} from "./api";


export const usersApi = {
    requestUsers (currentPage: number, pageSize: number) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            });
    },
    follow (userId:number){
        return instance.post<APIResponseType>(`follow/${userId}`).then(res => res.data)
    },
    unfollow (userId:number){
        return instance.delete(`follow/${userId}`).then(res => res.data) as Promise<APIResponseType>
    },
}