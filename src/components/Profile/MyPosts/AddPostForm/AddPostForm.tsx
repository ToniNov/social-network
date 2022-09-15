import {required} from "../../../../utils/validators";
import React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, GetStringKeys, Input} from "../../../common/FormsControls/FormsControls";
import Button from "@mui/material/Button";

type PropsType = {}

export type AddPostFormValuesType = {
    newPostText: string
}
type AddPostFormValuesTypeKeys = GetStringKeys<AddPostFormValuesType>

const AddPostForm: React.FC<InjectedFormProps<AddPostFormValuesType, PropsType> & PropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {createField<AddPostFormValuesTypeKeys>("Your post", 'newPostText',
                    [required], Input)}
            </div>
            <div>
                <Button variant="contained" style={{textTransform: 'none'}}>Add Post</Button>
            </div>
        </form>
    )
}

export default reduxForm<AddPostFormValuesType, PropsType>({form: "profileAddPostForm"})(AddPostForm)