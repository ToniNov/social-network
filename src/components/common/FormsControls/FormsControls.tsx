import React from 'react';
import s from './FormsControls.module.css'
import {Field, WrappedFieldProps} from "redux-form";
import {FieldValidatorType} from "../../../utils/validators";
import InputBase from "@mui/material/InputBase";
import TextField from "@mui/material/TextField";

type FormControlType = {
    meta: MetaType
    children: React.ReactNode
}

type MetaType = {
    touched: boolean
    error?: string | null
}

const FormControl = ({meta: {touched, error}, children}: FormControlType) => {
    const hasError = touched && error
    return (
        <div className={s.formControl + " " + (hasError ? s.error : " ")}>
            <div>
                {children}
            </div>
            {hasError && <span>{error}</span>}
        </div>
    );
};

export const Textarea: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props
    return <FormControl {...props}><TextField  {...input} {...restProps}/></FormControl>
};

export const Input: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props
    return <FormControl {...props}> <InputBase fullWidth={true} {...input} {...restProps}/></FormControl>
};

export type GetStringKeys<T> = Extract<keyof T, string>

export function createField<FormKeysType extends string>(placeholder: string | undefined,
                                                         name: FormKeysType,
                                                         validators: Array<FieldValidatorType>,
                                                         component: React.FC<WrappedFieldProps>,
                                                         props = {}, text = "") {
    return <div>
        <Field placeholder={placeholder} name={name}
               validate={validators}
               component={component}
               {...props}
        /> {text}
    </div>
}





