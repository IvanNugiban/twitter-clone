import React, {useEffect} from 'react';
import {useQuery} from "@apollo/client";
import {GET_FOLLOWING} from "../../graphql/queries/following";
import CenteredLoader from '../atoms/CenteredLoader';
import UserCard from "./UserCard";
import {IFollower} from "../../types/interfaces/IFollower";
import {useNavigate} from "react-router-dom";
import Alert from "../atoms/Alert";
import NoFollowData from "../atoms/NoFollowData";


interface IProps {
    pseudonym: string;
}

const FollowingList = ({pseudonym} : IProps) => {


    const {data, loading, error, refetch} = useQuery(GET_FOLLOWING, {
        variables: {
            pseudonym
        }
    })




    if (loading) return <CenteredLoader/>
    if (data.getFollowing.length === 0) return <NoFollowData isFollowingPage={true}/>

    return (
        <div>
            {data.getFollowing.map((user : IFollower) => <UserCard key={user.pseudonym} {...user} refetch={refetch}/>)}
            {error && <Alert text={error.message} interval={3000}/>}
        </div>
    );
};

export default FollowingList;