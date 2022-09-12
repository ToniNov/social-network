import React, {useEffect} from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import HeaderContainer from "./components/Header/HeaderContainer";
import {Provider, useDispatch, useSelector} from "react-redux";
import {initializeApp} from "./redux/app-reducer";
import {store} from "./redux/redux-store";
import {Preloader} from "./components/common/Preloader/Preloader";
import {withSuspense} from "./hoc/withSuspense";
import {selectIsInitialized} from "./redux/users-selectors";
import {ErrorSnackbar} from "./components/common/ErrorSnackbar/ErrorSnackbar";

const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"));
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"));
const UsersPage = React.lazy(() => import("./components/Users/UsersPage"));
const LoginPage = React.lazy(() => import("./components/Login/LoginPage"));
const NotFound = () => <div>404 Not found</div>;



const App = ()=> {

    const initialized = useSelector(selectIsInitialized)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeApp())
    }, [])

    if (!initialized){
        return <Preloader/>
    }

    return (
        <div className='app-wrapper'>
            <HeaderContainer/>
            <Navbar/>
            <ErrorSnackbar/>
            <div className='app-wrapper-content'>
                <Switch>
                    <Route exact path={'/'}
                           render = {() => <Redirect to={'/profile'}/>}/>
                    <Route exact path={'/dialogs'}
                           render = {() => withSuspense(DialogsContainer)}/>
                    <Route exact path={'/profile/:userId?'}
                           render = {() => withSuspense(ProfileContainer)}/>
                    <Route exact path={'/users'}
                           render = {() => withSuspense(UsersPage)}/>
                    <Route exact path={'/login'}
                           render = {() => withSuspense(LoginPage)}/>
                    <Route exact path={'/news'}
                           render = {() => withSuspense(News)}/>
                    <Route exact path={'/music'}
                           render = {() => withSuspense(Music)}/>
                    <Route exact path={'/settings'}
                           render = {() => withSuspense(Settings)}/>
                    <Route component={NotFound} />
                </Switch>

            </div>
        </div>
    );
}


let RootAppSocialNetwork : React.FC = () => {
    return <BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>
}

export default RootAppSocialNetwork;
