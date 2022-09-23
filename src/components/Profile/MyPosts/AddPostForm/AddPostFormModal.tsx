import {required} from "../../../../utils/validators";
import React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, GetStringKeys, Input, Textarea} from "../../../common/FormsControls/FormsControls";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {Paper} from "@mui/material";
import TextField from "@mui/material/TextField";
import {GeneralModal} from "../../../common/Modal/GeneralModal";

type PropsType = {
    visible: boolean
    setActive: (state: boolean) => void
}

export type AddPostFormValuesType = {
    newPostText: string
}

type AddPostFormValuesTypeKeys = GetStringKeys<AddPostFormValuesType>

const AddPostFormModal: React.FC<PropsType & InjectedFormProps<AddPostFormValuesType, PropsType>> =
    ({visible, setActive, handleSubmit}) => {

    return (

        <GeneralModal visible={visible} setVisible={setActive}>

        <form onSubmit={handleSubmit}>
            <Paper sx={{bgcolor: '#e9fccf'}}>
                    {createField<AddPostFormValuesTypeKeys>("Your post", 'newPostText',
                        [required], Textarea)}
                    <Button type={'submit'} variant="contained" style={{textTransform: 'none'}}>Add Post</Button>
            </Paper>
        </form>

        </GeneralModal>
    )
}

export default reduxForm<AddPostFormValuesType, PropsType>({form: "profileAddPostForm"})(AddPostFormModal)