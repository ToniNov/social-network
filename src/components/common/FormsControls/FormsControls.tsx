import React from 'react';
import s from './FormsControls.module.css'

type FormControlType =  {
    meta: MetaType
    input: HTMLInputElement | HTMLTextAreaElement
    children: React.ReactNode
}

type MetaType = {
    touched: boolean
    error?: string | null
}

const FormControl =  ({input, meta, ...props}:FormControlType)=> {
    const hasError = meta.touched && meta.error
    return (
        <div className={s.formControl + " " + (hasError ? s.error : " ")}>
            <div>
                {props.children}
            </div>
            { hasError && <span>{meta.error}</span>}
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



