import React, {ChangeEvent, ChangeEventHandler} from 'react';
import s from './MyPosts.module.css';
import Post from "./Post/Post";
import {addPostAC, PostType, StateACType, updateNewPostTextAC} from "../../../redux/state";

type MyPostsType = {
    posts:Array<PostType>
    addPost:(postText:string) => void
    newPostText: string
    updateNewPostText:(newText:string)=>void
    dispatch:(action:StateACType) => void
}

const MyPosts = (props:MyPostsType) => {

    const postsElement = props.posts
        .map((p,index)=><Post key={p.id} message={p.message} likeCounts={p.likeCounts} /> );

    const addPost = () => {
        props.dispatch(addPostAC(props.newPostText))
    }


    let onPostChange = (e:ChangeEvent<HTMLTextAreaElement>) => {
        props.dispatch(updateNewPostTextAC(e.currentTarget.value))
    }

    return (
        <div className={s.postsBlock}>
            <div>
                <h3>My posts</h3>
                <div>
                    <div>
                        <textarea value={props.newPostText} onChange={onPostChange} />
                    </div>
                    <div>
                        <button onClick={addPost}>Add Post</button>
                    </div>
                </div>
                <div className={s.posts}>
                    {postsElement}
                </div>
            </div>
        </div>
    );
};

export default MyPosts;