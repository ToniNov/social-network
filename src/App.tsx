import React, { Suspense } from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {BrowserRouter, Redirect, Route, withRouter} from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import HeaderContainer from "./components/Header/HeaderContainer";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reduser";
import {AppStateType, store} from "./redux/redux-store";
import {Preloader} from "./components/common/Preloader/Preloader";
import {withSuspense} from "./hoc/withSuspense";

const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"));
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"));
const UsersContainer = React.lazy(() => import("./components/Users/UsersContainer"));
const LoginPage = React.lazy(() => import("./components/Login/Login"));

type AppPropsType = {
    initializeApp: () => void
}

class App extends React.Component<AppPropsType> {
    catchAllUnhandledErrors = (promiseRejectionEvent: any) =>{
        alert(promiseRejectionEvent)
    }
    componentDidMount() {
        this.props.initializeApp()
        window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors)
    }
    componentWillUnmount() {
        window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors)
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

                    <Route path={'/'}
                           render = {() => <Redirect to={'/profile'}/>}/>
                    <Route path={'/dialogs'}
                           render = {() => withSuspense(DialogsContainer)}/>
                    <Route path={'/profile/:userId?'}
                           render = {() => withSuspense(ProfileContainer)}/>
                    <Route path={'/users'}
                           render = {() => withSuspense(UsersContainer)}/>
                    <Route path={'/login'}
                           render = {() => withSuspense(LoginPage)}/>
                    <Route path={'/news'}
                           render = {() => withSuspense(News)}/>
                    <Route path={'/music'}
                           render = {() => withSuspense(Music)}/>
                    <Route path={'/settings'}
                           render = {() => withSuspense(Settings)}/>
                    <Route path={'*'}
                           render = {() => <div>404 Not found</div>}/>

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
