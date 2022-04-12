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
import state, {RootStateType, updateNewPostText} from "./redux/state";
import {addPost} from "./redux/state";

type AppPropsType = {
    state:RootStateType
    addPost:(postText:string) => void
    updateNewPostText:(newText:string)=>void
}


function App(props:AppPropsType) {

    return (
        <BrowserRouter>
        <div className='app-wrapper'>
            <Header />
            <Navbar />
            <div className='app-wrapper-content'>
                <Route render={ () =>
                    <Profile profilePage={props.state.profilePage}
                             addPost={props.addPost}
                             updateNewPostText={props.updateNewPostText}
                             />} path= {'/profile'} />
                <Route render={ () => <Dialogs dialogs={props.state.dialogsPage.dialogs} messages={props.state.dialogsPage.messages} />} path= {'/dialogs'} />
                <Route render={ () => <News/>} path= {'/news'} />
                <Route render={ () => <Music/>} path= {'/music'} />
                <Route render={ () => <Settings/>} path= {'/settings'} />
            </div>
        </div>
        </BrowserRouter>
    );
}

export default App;
