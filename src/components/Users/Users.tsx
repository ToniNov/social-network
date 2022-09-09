import React, {useEffect} from 'react';
import {Paginator} from "../common/Paginator/Paginator";
import {User} from "./User";
import {UsersSearchForm} from "./UsersSearchForm";
import {FilterType, follow, requestUsers, unfollow,} from "../../redux/users-reducer";
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getPageSize,
    getTotalUsersCount,
    getUsers,
    getUsersFilter
} from "../../redux/users-selectors";
import {useHistory} from "react-router-dom";
import * as queryString from "querystring";


type PropsType = {}

export const Users: React.FC<PropsType> = (props) => {

    const users = useSelector(getUsers)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const followingInProgress = useSelector(getFollowingInProgress)

    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        const parsed = queryString.parse(history.location.search.substr(1)) as {term: string, page: string, friend: string}

        let actualPage = currentPage
        let actualFilter = filter

        if(!!parsed.page) actualPage = Number(parsed.page)

        if(!!parsed.term) actualFilter = {...actualFilter, term: parsed.term as string}

        switch(parsed.friend) {
            case "null":
                actualFilter = {...actualFilter, friend: null}
                break;
            case "true":
                actualFilter = {...actualFilter, friend: true}
                break;
            case "false":
                actualFilter = {...actualFilter, friend: false}
                break;
        }

        dispatch(requestUsers(actualPage, pageSize, actualFilter))
    }, [])

    useEffect(()=>{
        history.push({
            pathname:'/users',
            search:`?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`
        })
    }, [filter, currentPage])

    const onPageChange = (pageNumber: number) => {
        dispatch(requestUsers(pageNumber, pageSize, filter))
    }

    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize, filter))
    }

    const followUser = (userId: number) => {
        dispatch(follow(userId));
    }
    const unfollowUser = (userId: number) => {
        dispatch(unfollow(userId));
    }


    return (
        <div>
            <UsersSearchForm onFilterChanged={onFilterChanged}/>

            <Paginator portionSize={pageSize}
                       totalItemsCount={totalUsersCount}
                       pageSize={pageSize}
                       onPageChange={onPageChange}
                       currentPage={currentPage}
            />

            <div>
                {
                    users.map(u => <User key={u.id}
                                         user={u}
                                         unfollow={unfollowUser}
                                         follow={followUser}
                                         followingInProgress={followingInProgress}
                    />)
                }
            </div>
        </div>
    );
};

