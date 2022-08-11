import React from 'react';
import s from './MyPosts.module.css';
import Post from "./Post/Post";
import {PostsPropsType} from "./MyPostsContainer";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators";
import {Textarea} from "../../common/FormsControls/FormsControls";

const MyPosts = React.memo ((props: PostsPropsType) => {

    const postsElement = [...props.posts]
        .reverse()
        .map((p, index) => <Post key={p.id} message={p.message} likeCounts={p.likeCounts}/>);

    let onAddPost = (values: any) => {
        props.addPost(values.newPostText)
    }

    return (
        <div className={s.postsBlock}>
            <div>
                <h3>My posts</h3>
                <AddNewPostFormRedux onSubmit={onAddPost}/>
                <div className={s.posts}>
                    {postsElement}
                </div>
            </div>
        </div>
    );
});


type FormDataType = {
    textarea: string
}

const maxLength10 = maxLengthCreator(10)

const AddNewPostForm : React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea} name="newPostText" placeholder="Write your post"
                validate = {[required,maxLength10]}/>
            </div>
            <div>
                <button>Add Post</button>
            </div>
        </form>
    )
}

const AddNewPostFormRedux = reduxForm<FormDataType>({form: "profileAddPostForm"})(AddNewPostForm)

export default MyPosts;