import React from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {createField, Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reduser";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../../redux/redux-store";
import s from "./../common/FormsControls/FormsControls.module.css"


type LoginFormOwnProps = {
    captchaUrl: string | null
}

const LoginForm : React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = ({handleSubmit, error, captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField('Email','email',[required], Input)}
            {createField('Password','password',[required], Input, {type:'password'})}
            {createField(null,'rememberMe',[], Input, {type:'checkbox'},"Remember me")}

            {captchaUrl && <img src={captchaUrl}/>}
            {captchaUrl && createField( "Symbols from image",'captcha',[required], Input)}

            {error && <div className={s.formSummaryError}>
                {error}
            </div>}
            <div>
                <button>Sing In</button>
            </div>
        </form>
    );
};

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({form: 'login'})(LoginForm)

export type LoginFormValuesType = {
    captcha: string
    rememberMe: boolean
    password: string
    email: string
}

type PropsType = {
    login : (email:string, password: string ,rememberMe: boolean, captcha: string ) => void
    isAuth: boolean
    captchaUrl: string | null
}

const Login = (props:PropsType) => {
    const onSubmit = (formData:LoginFormValuesType) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

    if (props.isAuth) {
        return <Redirect to={"/profile"}/>
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}  captchaUrl = {props.captchaUrl} />
        </div>
    );
};

type MapStateToPropsType = {
    isAuth: boolean
    captchaUrl: string | null
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    isAuth : state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})


export default connect(mapStateToProps,{login})(Login);