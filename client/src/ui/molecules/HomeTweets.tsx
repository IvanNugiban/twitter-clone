import React, {RefObject, useEffect, useRef} from 'react';
import Paragraph from "../atoms/Typography/Paragraph";
import styled from "styled-components";
import SubTitle from "../atoms/Typography/SubTitle";
import Button from "../atoms/Button";
import {useNavigate} from "react-router-dom";
import {useQuery} from "@apollo/client";
import {GET_HOME_TWEETS} from "../../graphql/queries/tweets";
import CenteredLoader from "../atoms/CenteredLoader";
import {ITweet} from "../../types/interfaces/ITweet";
import Tweet from '../organism/Tweet';
import TweetsStore from "../../store/TweetsStore";
import {observer} from "mobx-react-lite";
import useInfinityScroll from "../../hooks/useInfinityScroll";

interface IProps {
    followingAmount: number;
    transparentElementRef: RefObject<HTMLDivElement>;
}

const Wrapper = styled.div`
  @media screen and ${({theme}) => theme.media.mobileL} {
    .tweet:last-child {
      margin-bottom: 70px;
    }
  }
`

const NoTweetsMessage = styled.div`
  padding: 0 10px;
  max-width: 400px;
  margin: 10px auto;

  p {
    margin: 10px 0;
  }

  button {
    width: 30%;
  }
`


const HomeTweets = observer(({followingAmount, transparentElementRef}: IProps) => {

    const navigate = useNavigate();
    const {data, loading, error} = useQuery(GET_HOME_TWEETS, {
        variables: {
            HomeTweetsData: {
                limit: TweetsStore.limit,
                typeOfSearch: TweetsStore.tweetSortType,
                initialLimit: TweetsStore.initialLimit
            }
        }
    })
    const prevSortType = useRef(TweetsStore.tweetSortType);


    useEffect(() => {
        window.scrollTo(0, TweetsStore.scrollPosition)
    }, [])

    useEffect(() => {
        function saveScrollPosition() {
            TweetsStore.setScrollPosition(window.scrollY)
        }

        document.addEventListener("scroll", saveScrollPosition)
        return () => {
            document.removeEventListener("scroll", saveScrollPosition)
        }
    }, [])

    useInfinityScroll(data?.getHomeTweets?.hasMore, TweetsStore.limit, TweetsStore.initialLimit, () => {
        TweetsStore.increaseLimit();
    }, loading, transparentElementRef.current, [TweetsStore.tweets, TweetsStore.limit])

    useEffect(() => {
        if (!data?.getHomeTweets?.tweets) return;
        if (TweetsStore.tweetSortType === prevSortType.current) TweetsStore.setTweets(data.getHomeTweets.tweets);
        else TweetsStore.setNewTweets(data.getHomeTweets.tweets)
        prevSortType.current = TweetsStore.tweetSortType;
    }, [data, TweetsStore.tweetSortType])

    if ((followingAmount === 0 || error || (data?.getHomeTweets?.tweets?.length === 0 && TweetsStore.tweets.length === 0)) && !loading) return <NoTweetsMessage>
        <SubTitle>Welcome to Twitter!</SubTitle>
        <Paragraph>This is the best place to see what’s happening in your world. Find some people and topics to follow
            now.</Paragraph>
        <Button onClick={() => navigate("/explore")}>Let's go!</Button>
    </NoTweetsMessage>


    return (
        <Wrapper>
            {TweetsStore.tweets.map((tweet: ITweet) => <Tweet key={tweet.id}
                                                              onClick={() => navigate(`/${tweet.userRef}/status/${tweet.id}`)}
                                                              className="tweet" {...tweet}/>)}
            {loading && <CenteredLoader/>}
        </Wrapper>
    );
});

export default HomeTweets;