import React from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reduser";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../../redux/redux-store";
import s from "./../common/FormsControls/FormsControls.module.css"


type FormDataType = {
    email:string
    password: string
    rememberMe: boolean
}

const LoginForm : React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={'Email'} validate={[required]} name={'email'} component={Input}/>
            </div>
            <div>
                <Field placeholder={'Password'} validate={[required]}
                       name={'password'} component={Input} type = {'password'}/>
            </div>
            <div>
                <Field component={Input} name={'rememberMe'} type={'checkbox'}/> Remember me
            </div>
            { props.error && <div className={s.formSummaryError}>
                {props.error}
            </div>}
            <div>
                <button>Sing In</button>
            </div>
        </form>
    );
};

const LoginReduxForm = reduxForm<FormDataType>({form: 'login'})(LoginForm)

type PropsType = {
    login : (email:string, password: string ,rememberMe: boolean) => void
    isAuth: boolean
}

const Login = (props:PropsType) => {
    const onSubmit = (formData:FormDataType) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    }

    if (props.isAuth) {
        return <Redirect to={"/profile"}/>
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} />
        </div>
    );
};

type MapStateToPropsType = {
    isAuth: boolean
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({isAuth : state.auth.isAuth})


export default connect(mapStateToProps,{login})(Login);