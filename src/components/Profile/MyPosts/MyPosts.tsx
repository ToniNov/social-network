import React, {ChangeEvent} from 'react';
import s from './MyPosts.module.css';
import Post from "./Post/Post";
import {PostsPropsType} from "./MyPostsContainer";

const MyPosts = (props:PostsPropsType) => {

    const postsElement = props.posts
        .map((p,index)=><Post key={p.id} message={p.message} likeCounts={p.likeCounts} /> );

    const onAddPost = () => {
        props.addPost(props.newPostText)
    }

    let onPostChange = (e:ChangeEvent<HTMLTextAreaElement>) => {
        props.updateNewPostTextCallback(e.currentTarget.value)
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
                        <button onClick={onAddPost}>Add Post</button>
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