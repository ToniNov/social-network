import {actions, InitialStateType, usersReducer} from "./users-reducer";

let state: InitialStateType

    beforeEach(() => {
        state = {
            users: [
                {
                    id: 0, name: "Bob 0", followed: false, photos: {small: null, large: null},
                    status: "status 0", location: {city: "string", country: "string"}
                },
                {
                    id: 1, name: "Jon 1", followed: false, photos: {small: null, large: null},
                    status: "status 1", location: {city: "string", country: "string"}
                },
                {
                    id: 2, name: "Jack 2", followed: true, photos: {small: null, large: null},
                    status: "status 2", location: {city: "string", country: "string"}
                },
                {
                    id: 3, name: "Yan 3", followed: true, photos: {small: null, large: null},
                    status: "status 3", location: {city: "string", country: "string"}
                }
            ],
            pageSize: 10,
            totalUsersCount: 0,
            currentPage: 1,
            isFetching: false,
            followingInProgress: [] as Array<number>, //array of users ids,
            filter: {
                term: '',
                friend: null as null | boolean
            }
        }
    })


it('Followed success', () => {

    const newState = usersReducer(state, actions.followSuccess(1))

    expect(newState.users[0].followed).toBeFalsy()
    expect(newState.users[1].followed).toBeTruthy()

})


it('Unfollow success', () => {

    const newState = usersReducer(state, actions.unfollowSuccess(3))

    expect(newState.users[3].followed).toBeFalsy()
    expect(newState.users[2].followed).toBeTruthy()

});