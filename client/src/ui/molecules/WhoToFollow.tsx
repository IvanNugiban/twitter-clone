import React from 'react';
import styled from "styled-components";
import H4Title from "../atoms/Typography/H4Title";
import {useQuery} from "@apollo/client";
import {GET_RECOMMENDED_USERS} from "../../graphql/queries/search";
import UserCard from "./UserCard";
import CenteredLoader from "../atoms/CenteredLoader";
import Alert from "../atoms/Alert";
import {IUser} from "../../types/interfaces/IUser";

const StyledWhoToFollow = styled.section`
  width: 100%;
  border-radius: 20px;
  padding: 15px 0 15px 0;
  background-color: ${({theme}) => theme.colors.gray_thin};
  margin: 15px 0;
  
  h4 {
    padding-left: 15px;
    margin-bottom: 5px;
  }

`

const StyledUserCard = styled(UserCard)`
  &:hover {
    background-color: rgba(203, 204, 206, 0.50);
  }
`


const WhoToFollow = () => {

    const {loading, error, data} = useQuery(GET_RECOMMENDED_USERS);


    return (
        <StyledWhoToFollow>
            <H4Title>You might like</H4Title>
            {loading ? <CenteredLoader/> : <React.Fragment>
                {data?.getRecommendedUsers?.map((user: IUser) => <StyledUserCard withoutFollowButton={true} key={user.pseudonym} {...user}
                                                                                 isFollowing={true}/>)}
            </React.Fragment>}
            {error && <Alert text={error.message} interval={3000}/>}
        </StyledWhoToFollow>
    );
};

export default WhoToFollow;