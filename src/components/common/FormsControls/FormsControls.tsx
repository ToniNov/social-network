import React from 'react';
import s from './FormsControls.module.css'
import {required} from "../../../utils/validators";
import {Field} from "redux-form";

type FormControlType =  {
    meta: MetaType
    input: HTMLInputElement | HTMLTextAreaElement
    children: React.ReactNode
}

type MetaType = {
    touched: boolean
    error?: string | null
}

const FormControl =  ({input, meta:{touched, error},children}:FormControlType)=> {
    const hasError = touched && error
    return (
        <div className={s.formControl + " " + (hasError ? s.error : " ")}>
            <div>
                {children}
            </div>
            { hasError && <span>{error}</span>}
        </div>
    );
};

export const Textarea = (props:any ) => {
    const {input, meta, ...restprops} = props
    return <FormControl {...props}><textarea {...input} {...restprops}/></FormControl>
};

export const Input = (props:any ) => {
    const {input, meta, ...restprops} = props
    return <FormControl {...props}> <input {...input} {...restprops}/></FormControl>
};

export const createField = (placeholder: string | null, name: string, validators: any, component: any, props?: any, text ="") => (
    <div>
        <Field placeholder={placeholder}
               name={name}
               validate={validators}
               component={component}
                {...props}
        /> {text}
    </div>

)




