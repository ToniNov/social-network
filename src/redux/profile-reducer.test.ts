import {addPost, deletePost, profileReducer} from "./profile-reducer";

let state = {
    posts: [
        {id: 1, message: 'Hi,how are you?', likeCounts: '5'},
        {id: 2, message: 'Yo', likeCounts: '10'},
    ],
    profile: null,
    status: ''
}

it('length of post should be incremented ', () => {

    let action = addPost('Hello World')
    let newState = profileReducer(state, action);

    expect(newState.posts.length).toBe(3)

});

it('message of new post should be Hello World ', () => {

    let action = addPost('Hello World')
    let newState = profileReducer(state, action);

    expect(newState.posts[2].message).toBe('Hello World')
});

it('length after deleting should be decrement ', () => {

    let action = deletePost(1)
    let newState = profileReducer(state, action);

    expect(newState.posts.length).toBe(1)
});