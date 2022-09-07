import React from 'react';
import {useSelector} from "react-redux";
import {Preloader} from "../common/Preloader/Preloader";
import {getIsFetching,} from "../../redux/users-selectors";
import {Users} from "./Users";


type PropsType = {

}

const UsersPage: React.FC<PropsType> = (props) => {

    const isFetching = useSelector(getIsFetching)

    return (
        <>
            {isFetching ? <Preloader/> : null}
            <Users/>
        </>
    )
}

export default UsersPage;

