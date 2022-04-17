import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";
import {BrowserRouter, Route} from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import { StoreType} from "./redux/store";


type AppPropsType = {
    store: StoreType
}


const App: React.FC<AppPropsType> = (props) => {
    const state = props.store.getState();

    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <Header/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Route render={() =>
                        <Profile profilePage={props.store._state.profilePage}
                                 dispatch = {props.store.dispatch.bind(props.store)}
                                 addPost={props.store.addPost.bind(props.store)}
                                 updateNewPostText={props.store.updateNewPostText.bind(props.store)}
                        />} path={'/profile'}/>
                    <Route render={() => <Dialogs store={props.store}
                    />} path={'/dialogs'}/>
                    <Route render={() => <News/>} path={'/news'}/>
                    <Route render={() => <Music/>} path={'/music'}/>
                    <Route render={() => <Settings/>} path={'/settings'}/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
