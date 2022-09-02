import {actions, profileReducer} from "./profile-reducer";

let state = {
    posts: [
        {id: 1, message: 'Hi,how are you?', likeCounts: '5'},
        {id: 2, message: 'Yo', likeCounts: '10'},
    ],
    profile: null,
    status: '',
}

it('length of post should be incremented ', () => {

    let action = actions.addPost('Hello World')
    let newState = profileReducer(state, action);

    expect(newState.posts.length).toBe(3)

});

it('message of new post should be Hello World ', () => {

    let action = actions.addPost('Hello World')
    let newState = profileReducer(state, action);

    expect(newState.posts[2].message).toBe('Hello World')
});

it('length after deleting should be decrement ', () => {

    let action = actions.deletePost(1)
    let newState = profileReducer(state, action);

    expect(newState.posts.length).toBe(1)
});

it(`after deleting length shouldn't be decrement if id is incorrect`, () => {

    let action = actions.deletePost(1000);
    let newState = profileReducer(state, action);

    expect(newState.posts.length).toBe(2);
});