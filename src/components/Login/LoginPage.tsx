import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import {LoginFormValuesType, LoginReduxForm} from "./LoginForm";
import {getCaptchaUrl, getIsAuth} from "../../redux/users-selectors";

const LoginPage: React.FC = (props) => {

    const captchaUrl = useSelector(getCaptchaUrl)
    const isAuth = useSelector(getIsAuth)
    const dispatch = useDispatch();

    const onSubmit = (formData: LoginFormValuesType) => {
        dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha))
    }

    if (isAuth) {
        return <Redirect to={"/profile"}/>
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>
        </div>
    );
};

export default LoginPage;