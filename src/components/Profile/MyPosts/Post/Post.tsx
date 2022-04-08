import React from 'react';
import s from './Post.module.css';

const Post = () => {
    return (
        <div className={s.item}>
            <div>
                <img
                    src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK6uAwJ2JNN2hrgWi18n2nGk5iJ9yF7N7ghg&usqp=CAU'/>
            </div>
            <div>Post</div>
            <span>like</span>
        </div>
    );
};

export default Post;