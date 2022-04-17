import React from 'react';
import './index.css';
import ReactDOM from "react-dom";
import App from "./App";
import store from "./redux/store";

export const renderTree = () => {
    ReactDOM.render(
        <App store = {store}/>,
        document.getElementById('root')
    );
}

store.subscribe(renderTree)
renderTree()


