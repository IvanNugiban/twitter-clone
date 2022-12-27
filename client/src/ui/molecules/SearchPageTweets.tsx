import React, {RefObject, useEffect} from "react";
import {useQuery} from "@apollo/client";
import {GET_SEARCHED_TWEETS} from "../../graphql/queries/tweets";
import SearchStore from "../../store/SearchStore";
import {ITweet} from "../../types/interfaces/ITweet";
import Tweet from "../organism/Tweet";
import styled from "styled-components";
import useInfinityScroll from "../../hooks/useInfinityScroll";
import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import NoResultsMessage from "../atoms/NoResultsMessage";

interface IProps {
    request: string;
}

const Wrapper = styled.div`
  @media screen and ${({theme}) => theme.media.mobileL} {
    margin-bottom: 70px;
  }
`

interface IProps {
    request: string;
    transparentElementRef: RefObject<HTMLDivElement>;
}


const SearchPageTweets = observer(({request, transparentElementRef}: IProps) => {

    const navigate = useNavigate();

    const {
        data: tweets,
        loading: tweetsLoading,
        error: tweetsError
    } = useQuery(GET_SEARCHED_TWEETS, {
        variables: {
            TweetSearch: {
                searchRequest: request,
                limit: SearchStore.tweetsLimit,
                initialLimit: SearchStore.initialLimit
            }
        }
    })


    useEffect(() => {
        if (!tweets?.getSearchedTweets?.tweets) return;
        SearchStore.setTweets(tweets.getSearchedTweets.tweets);
    }, [tweets])

    useInfinityScroll(tweets?.getSearchedTweets?.hasMore, SearchStore.tweetsLimit, SearchStore.initialLimit, () => {
        SearchStore.tweetsIncreaseLimit();
    }, tweetsLoading, transparentElementRef.current, [SearchStore.tweetsLimit, SearchStore.tweets])

    if ((tweetsError || (tweets?.getSearchedTweets?.tweets?.length === 0 && SearchStore.tweets.length === 0)) && !tweetsLoading) return <NoResultsMessage
        text={request}/>

    return (
        <Wrapper>
            {SearchStore.tweets.map((tweet: ITweet) => <Tweet key={tweet.id}
                                                              onClick={() => navigate(`/${tweet.userRef}/status/${tweet.id}`)}
                                                              className="tweet" {...tweet}/>)}
        </Wrapper>
    );
});

export default SearchPageTweets;