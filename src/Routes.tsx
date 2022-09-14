import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {withSuspense} from "./hoc/withSuspense";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";

const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"));
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"));
const UsersPage = React.lazy(() => import("./components/Users/UsersPage"));
const LoginPage = React.lazy(() => import("./components/Login/LoginPage"));
const NotFound = () => <div>404 Not found</div>;

export const PATH = {
    LOGIN: '/login',
    PROFILE: '/profile',
    DIALOGS: '/dialogs',
    USERS: '/users',
    NEWS: '/news',
    MUSIC: '/music',
    SETTINGS: '/setting'
}

export const Routes = () => {
    return (
        <Switch>
            <Route exact path={'/'}
                   render = {() => <Redirect to={PATH.PROFILE}/>}/>
            <Route exact path={PATH.DIALOGS}
                   render = {() => withSuspense(DialogsContainer)}/>
            <Route exact path={PATH.PROFILE + '/:userId?'}
                   render = {() => withSuspense(ProfileContainer)}/>
            <Route exact path={PATH.USERS}
                   render = {() => withSuspense(UsersPage)}/>
            <Route exact path={PATH.LOGIN}
                   render = {() => withSuspense(LoginPage)}/>
            <Route exact path={PATH.NEWS}
                   render = {() => withSuspense(News)}/>
            <Route exact path={PATH.MUSIC}
                   render = {() => withSuspense(Music)}/>
            <Route exact path={PATH.SETTINGS}
                   render = {() => withSuspense(Settings)}/>
            <Route component={NotFound} />
        </Switch>
    );
};

export default Routes;