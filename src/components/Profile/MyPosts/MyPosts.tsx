import React, {useState} from 'react';
import s from './MyPosts.module.css';
import Post from "./Post/Post";
import {Paper} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CreateIcon from '@mui/icons-material/Create';
import AddPostFormModal, {AddPostFormValuesType} from "./AddPostForm/AddPostFormModal";
import {useDispatch, useSelector} from "react-redux";
import {selectPosts} from "../../../redux/users-selectors";
import {actions} from "../../../redux/profile-reducer";

const MyPosts: React.FC = React.memo(props => {

    const dispatch = useDispatch()
    const posts = useSelector(selectPosts)
    const [activeAddModal, setActiveAddModal] = useState<boolean>(false)

    const postsElement = [...posts]
        .reverse()
        .map(p => <Post key={p.id} message={p.message} likeCounts={p.likeCounts}/>);

    const addPostHandler = (values: AddPostFormValuesType) => {
        dispatch(actions.addPost(values.newPostText))
        setActiveAddModal(false);
    }

    const addPostButtonHandler = () => {
        setActiveAddModal(true);
    };


    return (
        <Paper sx={{
            minWidth: "340",
            bgcolor: '#cfe8fc',
            padding: '10px ',
            display: "flex",
            flexDirection: 'row',
            justifyContent: 'center'
        }}>
            <div>
                <Typography variant='h5'>My posts</Typography>

                <Button onClick={addPostButtonHandler}>
                    <CreateIcon/> Add post
                </Button>

                <AddPostFormModal
                    visible={activeAddModal}
                    setActive={setActiveAddModal}
                    onSubmit={addPostHandler}
                />

                <div className={s.posts}>
                    {postsElement}
                </div>
            </div>
        </Paper>
    );
});

export default MyPosts;