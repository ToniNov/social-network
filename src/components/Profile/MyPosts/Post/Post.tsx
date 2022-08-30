import React from 'react';
import s from './Post.module.css';

type PostType = {
    message: string,
    likeCounts: string
}

const Post = (props:PostType) => {

    return (
        <div className={s.item}>
            <div>
                <img
                    src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK6uAwJ2JNN2hrgWi18n2nGk5iJ9yF7N7ghg&usqp=CAU'
                alt="profile img"
                />
                {props.message}
            </div>
            <span> like</span> {props.likeCounts}
        </div>
    );
};

export default Post;