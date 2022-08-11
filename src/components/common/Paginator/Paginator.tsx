import React from 'react';
import s from "./Paginator.module.css"

type UsersPresPropsType = {
    totalUsersCount: number
    pageSize: number
    onPageChange: (pageNumber: number) => void
    currentPage: number
}

export const Paginator: React.FC<UsersPresPropsType> = ({
          totalUsersCount,
          pageSize,
          onPageChange,
          currentPage,
          }) => {

    let pagesCount = Math.ceil(totalUsersCount / pageSize);

    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
        if (i > 30) break
    }

    return (
        <div>
            {pages.map(p => {
                return <span onClick={(e) => {
                    onPageChange(p)
                }} className={currentPage === p ? s.selectedPage : ""}>{p}</span>
            })}
        </div>
    );
};


