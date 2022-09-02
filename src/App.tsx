import React from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {BrowserRouter, Redirect, Route, withRouter} from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import HeaderContainer from "./components/Header/HeaderContainer";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import {AppRootStateType, store} from "./redux/redux-store";
import {Preloader} from "./components/common/Preloader/Preloader";
import {withSuspense} from "./hoc/withSuspense";
import Login from "./components/Login/Login";

const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"));
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"));
const UsersContainer = React.lazy(() => import("./components/Users/UsersContainer"));
 const LoginPage = React.lazy(() => import("./components/Login/Login"));

type PropsType = MapPropsType & DispatchToPropsType

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchToPropsType = {
    initializeApp:() => void
}

class App extends React.Component<PropsType> {
    catchAllUnhandledErrors = (e: PromiseRejectionEvent) =>{
        alert("Some error occured")
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
                    {/*<Route path='/login'*/}
                    {/*       render={() => <Login/>}/>*/}
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


let mapStateToProps = (state:AppRootStateType) =>({ initialized : state.app.initialized})

let AppContainer = compose<React.ComponentType>(
    withRouter,
    connect<MapPropsType, DispatchToPropsType, {}, AppRootStateType>(mapStateToProps,
        {initializeApp}))(App)

let RootAppSocialNetwork : React.FC = () => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}

export default RootAppSocialNetwork;
