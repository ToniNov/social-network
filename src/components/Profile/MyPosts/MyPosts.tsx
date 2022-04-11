import React from 'react';
import s from './MyPosts.module.css';
import Post from "./Post/Post";

const MyPosts = () => {

    let posts= [
        {id: 1, message: 'Hi,how are you?', likeCounts:'5'},
        {id: 2, message: "Yooo", likeCounts:'10'},
        {id: 3, message: "NICE", likeCounts:'40'},
        {id: 4, message: "Smie you", likeCounts:'5'},
    ];

    let postsElement = posts
        .map(p => <Post message={p.message} likeCounts={p.likeCounts} /> );

    return (
        <div className={s.postsBlock}>
            <div>
                <h3>My posts</h3>
                <div>
                    <div>
                        <textarea></textarea>
                    </div>
                    <div>
                        <button>Add Post</button>
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