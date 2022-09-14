import React, {useEffect} from 'react';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import {Provider, useDispatch, useSelector} from "react-redux";
import {initializeApp} from "./redux/app-reducer";
import {store} from "./redux/redux-store";
import {selectIsInitialized} from "./redux/users-selectors";
import {ErrorSnackbar} from "./components/common/ErrorSnackbar/ErrorSnackbar";
import {CircularProgress} from "@mui/material";
import {AppHeaderBar} from "./components/Header/AppHeaderBar";
import Routes from "./Routes";

const App = ()=> {

    const initialized = useSelector(selectIsInitialized)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeApp())
    }, [])

    if (!initialized){
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <div className='app-wrapper'>
            <AppHeaderBar/>
            <ErrorSnackbar/>
            <div className='app-wrapper-content'>
               <Routes/>
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
