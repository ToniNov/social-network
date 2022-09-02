import React from 'react';
import s from './MyPosts.module.css';
import Post from "./Post/Post";
import {PostType} from "../../../types/types";
import AddPostForm, {AddPostFormValuesType} from './AddPostForm/AddPostForm';


export type MapPropsType = {
    posts: Array<PostType>
}
export type DispatchPropsType = {
    addPost: (newPostText: string) => void
}

const MyPosts : React.FC<MapPropsType & DispatchPropsType> = React.memo(props => {

    const postsElement = [...props.posts]
        .reverse()
        .map(p => <Post key={p.id} message={p.message} likeCounts={p.likeCounts}/>);

    let onAddPost = (values: AddPostFormValuesType) => {
        props.addPost(values.newPostText)
    }

    return (
        <div className={s.postsBlock}>
            <div>
                <h3>My posts</h3>
                <AddPostForm onSubmit={onAddPost}/>
                <div className={s.posts}>
                    {postsElement}
                </div>
            </div>
        </div>
    );
});

export default MyPosts;