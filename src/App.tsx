import React from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {BrowserRouter, Route, withRouter} from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginPage from "./components/Login/Login";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reduser";
import {AppStateType, store} from "./redux/redux-store";
import {Preloader} from "./components/common/Preloader/Preloader";

type AppPropsType = {
    initializeApp: () => void
}

class App extends React.Component<AppPropsType> {

    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        if (!this.props.initializeApp){
            return <Preloader/>
        }

        return (
            <div className='app-wrapper'>
                <HeaderContainer/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Route render={() =>
                        <ProfileContainer/>} path={'/profile/:userId?'}/>
                    <Route render={() =>
                        <DialogsContainer/>} path={'/dialogs'}/>
                    <Route render={() =>
                        <UsersContainer/>} path={'/users'}/>
                    <Route render={() =>
                        <LoginPage/>} path={'/Login'}/>

                    <Route render={() => <News/>} path={'/news'}/>
                    <Route render={() => <Music/>} path={'/music'}/>
                    <Route render={() => <Settings/>} path={'/settings'}/>
                </div>
            </div>
        );
    }
}

type MapDispatchToPropsType = {
    initializeApp:(initialized: boolean) => void
}

type  MapStateToPropsType = {
    initialized: boolean
}

let mapStateToProps = (state:AppStateType) : MapStateToPropsType =>({ initialized : state.app.initialized})

let AppContainer = compose<React.FC>(
    withRouter,
    connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps,
        {initializeApp}))(App)

let RootAppSocialNetwork = (props: any) => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}

export default RootAppSocialNetwork;
