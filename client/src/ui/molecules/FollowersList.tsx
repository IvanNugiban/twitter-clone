import React from 'react';
import {useQuery} from "@apollo/client";
import {GET_FOLLOWERS} from "../../graphql/queries/following";
import CenteredLoader from '../atoms/CenteredLoader';
import UserCard from "./UserCard";
import {IFollower} from "../../types/interfaces/IFollower";
import Alert from "../atoms/Alert";
import NoFollowData from "../atoms/NoFollowData";


interface IProps {
    pseudonym: string;
}

const FollowersList = ({pseudonym} : IProps) => {


    const {data, loading, error, refetch} = useQuery(GET_FOLLOWERS, {
        variables: {
            pseudonym
        }
    })



    if (loading) return <CenteredLoader/>
    if (data.getFollowers?.length === 0) return <NoFollowData isFollowingPage={false}/>

    return (
        <div>
            {data.getFollowers.map((user : IFollower) => <UserCard key={user.pseudonym} {...user} refetch={refetch}/>)}
            {error && <Alert text={error.message} interval={3000}/>}
        </div>
    );
};

export default FollowersList;