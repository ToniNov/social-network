export const some = {}
// import React from "react";
// import {InjectedFormProps, reduxForm} from "redux-form";
// import {createField, GetStringKeys, Input} from "../common/FormsControls/FormsControls";
// import {required} from "../../utils/validators";
// import s from "../common/FormsControls/FormsControls.module.css";
//
// export type LoginFormValuesType = {
//     captcha: string
//     rememberMe: boolean
//     password: string
//     email: string
// }
//
// type LoginFormValuesTypeKeys = GetStringKeys<LoginFormValuesType>
//
// type LoginFormOwnProps = {
//     captchaUrl: string | null
// }
//
// const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = (
//     {handleSubmit, error, captchaUrl}
// ) => {
//     return (
//         <form onSubmit={handleSubmit}>
//             {createField<LoginFormValuesTypeKeys>('Email', 'email', [required], Input)}
//             {createField<LoginFormValuesTypeKeys>('Password', 'password', [required], Input, {type: 'password'})}
//             {createField<LoginFormValuesTypeKeys>(undefined, 'rememberMe', [], Input, {type: 'checkbox'}, "Remember me")}
//
//             {captchaUrl && <img src={captchaUrl} alt="captcha"/>}
//             {captchaUrl && createField<LoginFormValuesTypeKeys>("Symbols from image", 'captcha', [required], Input)}
//
//             {error && <div className={s.formSummaryError}>
//                 {error}
//             </div>}
//             <div>
//                 <button>Sing In</button>
//             </div>
//         </form>
//     );
// };
//
// export const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({form: 'login'})(LoginForm)

