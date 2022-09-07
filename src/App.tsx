import React from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {BrowserRouter, Redirect, Route, Switch, withRouter} from "react-router-dom";
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


const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"));
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"));
const UsersPage = React.lazy(() => import("./components/Users/UsersPage"));
const LoginPage = React.lazy(() => import("./components/Login/Login"));

 const NotFound = () => <div>404 Not found</div>;

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
