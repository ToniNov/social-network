import React from 'react';
import './index.css';
import state, {addPost, RootStateType, subscribe, updateNewPostText} from "./redux/state";
import ReactDOM from "react-dom";
import App from "./App";

export const renderEntireTree = (state: RootStateType) => {
    ReactDOM.render(
        <App state={state} addPost={addPost} updateNewPostText={updateNewPostText}/>,
        document.getElementById('root')
    );
}

renderEntireTree(state);

subscribe(renderEntireTree)

