import React, {Dispatch, RefObject, SetStateAction, useEffect, useState} from 'react';
import styled from "styled-components";
import Popover from "./Popover";
import Paragraph from "../atoms/Typography/Paragraph";
import HorizontalLoader from "../atoms/HorizontalLoader";
import {useLazyQuery} from "@apollo/client";
import {SEARCH_FOR_RESULTS} from "../../graphql/queries/search";
import useDelayedRequest from "../../hooks/useDelayedRequest";
import {IHashtag} from "../../types/interfaces/IHashtag";
import {IUser} from "../../types/interfaces/IUser";
import UserCard from "./UserCard";
import HashtagCard from "../atoms/HashtagCard";
import {Link, useLocation, useNavigate} from "react-router-dom";

const StyledSearchPopover = styled(Popover)`
  transform: none;
  min-width: initial;
  width: 90%;
  margin-left: 5%;
`

const SearchResult = styled.div`
  overflow: auto;
`

const TryToSearchMessage = styled(Paragraph)`
  text-align: center;
  color: #7B8892;
  padding-top: 13px;
`

const AbsolutHorizontalLoader = styled(HorizontalLoader)`
  position: absolute;
  top: 10px;
`

const LinkForPage = styled(Paragraph)`
  display: block;
  padding: 10px;
  transition: 0.5s all;
  white-space: pre-line;
  line-height: 20px;


  &:hover {
    background-color: ${({theme}) => theme.colors.gray_thin};
    transition: 0.5s all;
  }
`


interface IProps {
    active: boolean;
    closePopover: (e?: MouseEvent | TouchEvent) => void;
    inputRef: RefObject<HTMLInputElement>;
    text: string;
    setSearchParams?: Dispatch<SetStateAction<string>>
}

const SearchPopover = ({active, closePopover, inputRef, text}: IProps) => {

    const [search, {data}] = useLazyQuery(SEARCH_FOR_RESULTS)
    const [isLoading, setLoadingState] = useState(false);
    const navigate = useNavigate();
    const {pathname} = useLocation();

    useEffect(() => {
        setLoadingState(false);
        closePopover();
    }, [pathname])

    useEffect(() => {
        setLoadingState(true)
    }, [text])

    useDelayedRequest([text], async () => {
        if (text === "") return;
        await search({variables: {searchRequest: text}});
        setLoadingState(false);
    });

    return (
        <StyledSearchPopover maxHeight="85vh" minHeight="130px" parentRef={inputRef} top={50} arrowPosition="top"
                             isActive={active}
                             closePopover={e => closePopover(e)} body={<SearchResult>
            {text === "" && <TryToSearchMessage>Try searching for people, topics, or keywords</TryToSearchMessage>}
            {!isLoading && data?.searchForResults?.users?.map((user: IUser) => <UserCard withoutFollowButton={true}
                                                                                         key={user.pseudonym} {...user}
                                                                                         isFollowing={false}/>)}
            {!isLoading && data?.searchForResults?.hashtags?.map((hashtag: IHashtag) => <HashtagCard
                key={hashtag.hashtag}
                callback={() => navigate(`/search/tweets?q=${hashtag.hashtag.slice(1)}`)} {...hashtag}/>)}
            {!isLoading && text !== "" &&
                <Link onClick={() => closePopover()}
                      to={`/search/tweets?q=${text.startsWith("#") ? text.slice(1) : text}`}><LinkForPage>Search
                    for {text}</LinkForPage></Link>}
            {!isLoading && text !== "" && <Link to={`/${text}`}><LinkForPage>Go to @{text}</LinkForPage></Link>}
            {isLoading && text !== "" && <AbsolutHorizontalLoader/>}
        </SearchResult>}/>

    );
};

export default SearchPopover;