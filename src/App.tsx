import React from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {Route} from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginPage from "./components/login/Login";

type AppPropsType = {

}

const App: React.FC<AppPropsType> = (props) => {


    return (
            <div className='app-wrapper'>
                <HeaderContainer />
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Route render={() =>
                        <ProfileContainer />} path={'/profile/:userId?'}/>
                    <Route render={() =>
                        <DialogsContainer />} path={'/dialogs'}/>
                    <Route render={() =>
                        <UsersContainer />} path={'/users'}/>
                    <Route render={() =>
                        <LoginPage />} path={'/login'}/>

                    <Route render={() => <News/>} path={'/news'}/>
                    <Route render={() => <Music/>} path={'/music'}/>
                    <Route render={() => <Settings/>} path={'/settings'}/>
                </div>
            </div>
    );
}

export default App;
