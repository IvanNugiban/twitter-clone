import React, {RefObject, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {useQuery} from "@apollo/client";
import useInfinityScroll from "../../hooks/useInfinityScroll";
import CenteredLoader from "../atoms/CenteredLoader";
import {GET_SEARCHED_USERS} from "../../graphql/queries/user";
import SearchStore from "../../store/SearchStore";
import styled from "styled-components";
import UserCard from "./UserCard";
import NoResultsMessage from "../atoms/NoResultsMessage";


const Wrapper = styled.div`
  @media screen and ${({theme}) => theme.media.mobileL} {
    margin-bottom: 70px;
  }
`

interface IProps {
    request: string;
    transparentElementRef: RefObject<HTMLDivElement>;
}

const SearchPageUsers = observer(({request, transparentElementRef}: IProps) => {


    const {
        data: users,
        loading: usersLoading,
        error: usersError
    } = useQuery(GET_SEARCHED_USERS, {
        variables: {
            UsersSearch: {
                searchRequest: request,
                limit: SearchStore.usersLimit,
                initialLimit: SearchStore.initialLimit
            }
        }
    })

    useInfinityScroll(users?.getSearchedUsers?.hasMore, SearchStore.usersLimit, SearchStore.initialLimit, () => {
        SearchStore.usersIncreaseLimit();
    }, usersLoading, transparentElementRef.current, [SearchStore.usersLimit, SearchStore.users])


    useEffect(() => {
        if (!users?.getSearchedUsers?.users) return;
        SearchStore.setUsers(users.getSearchedUsers.users);
    }, [users])

    if ((usersError || (users?.getSearchedUsers?.users?.length === 0 && SearchStore.users.length === 0)) && !usersLoading) return <NoResultsMessage text={request}/>

    return (
        <Wrapper>
            {SearchStore.users.map(user =>
                <UserCard withoutFollowButton={true} key={user.pseudonym} {...user} isFollowing={false}/>)}
            {usersLoading && <CenteredLoader/>}
        </Wrapper>
    );
});

export default SearchPageUsers;