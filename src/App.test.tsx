import React from "react";
import ReactDOM from "react-dom";
import RootAppSocialNetwork from "./App";

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<RootAppSocialNetwork/> , div);
    ReactDOM.unmountComponentAtNode(div);
});