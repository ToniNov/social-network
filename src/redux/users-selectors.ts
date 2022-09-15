import {AppRootStateType} from "./redux-store";

//USERS selectors
export const  getUsers =(state:AppRootStateType) => {
    return state.usersPage.users
}
export const getPageSize=(state:AppRootStateType) => {
    return state.usersPage.pageSize
}
export const getTotalUsersCount = (state:AppRootStateType) => {
    return state.usersPage.totalUsersCount
}
export const getCurrentPage = (state:AppRootStateType) => {
    return state.usersPage.currentPage
}
export const getIsFetching = (state:AppRootStateType) => {
    return state.usersPage.isFetching
}
export const getFollowingInProgress = (state:AppRootStateType)  => {
    return state.usersPage.followingInProgress
}
export const getUsersFilter = (state: AppRootStateType) => {
    return state.usersPage.filter;
}
// AUTH selectors
export const getCaptchaUrl = (state: AppRootStateType) => {
    return state.auth.captchaUrl;
}
export const getIsAuth = (state: AppRootStateType) => {
    return state.auth.isAuth;
}
export const getUserId = (state: AppRootStateType) => {
    return state.auth.userId;
}

//APP selectors
export const selectIsInitialized =(state:AppRootStateType) => {
    return state.app.isInitialized
};
//PROFILE
export const selectPosts =(state:AppRootStateType) => {
    return state.profilePage.posts
};
export const selectProfile =(state:AppRootStateType) => {
    return state.profilePage.profile
};
export const selectStatus =(state:AppRootStateType) => {
    return state.profilePage.status
};