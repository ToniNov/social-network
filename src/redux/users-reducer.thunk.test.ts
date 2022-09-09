export const b = {}
// import {actions, follow, unfollow} from "./users-reducer";
// import {usersApi} from "../api/users-api";
// import {APIResponseType, ResultCodesEnum} from "../api/api";
//
// jest.mock("../api/users-api")
// const usersApiMock = usersApi as jest.Mocked<typeof usersApi>
//
// const dispatchMock = jest.fn()
// const getStateMock = jest.fn()
//
// beforeEach(()=> {
//     dispatchMock.mockClear()
//     getStateMock.mockClear()
//     usersApiMock.follow.mockClear()
//     usersApiMock.unfollow.mockClear()
// })
//
// const result: APIResponseType = {
//     resultCode: ResultCodesEnum.Success,
//     messages: [],
//     data: {},
// }
// console.log({usersApiMock})
// usersApiMock.follow.mockReturnValue(Promise.resolve(result))
// usersApiMock.unfollow.mockReturnValue(Promise.resolve(result))
//
// test('Follow thunk do all dispatch ',  async () => {
//     const thunk = follow(1)
//
//     await thunk(dispatchMock, getStateMock, {})
//
//     expect(dispatchMock).toBeCalledTimes(3)
//     expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleIsFollowingProgress(true, 1))
//     expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSuccess(1))
//     expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleIsFollowingProgress(false, 1))
// })
//
// test('Unfollow thunk do all dispatch ',  async ()=> {
//     const thunk = unfollow(1)
//
//     await thunk(dispatchMock, getStateMock, {})
//
//     expect(dispatchMock).toBeCalledTimes(3)
//     expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleIsFollowingProgress(true,1))
//     expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSuccess(1))
//     expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleIsFollowingProgress(false,1))
// })