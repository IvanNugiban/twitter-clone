import React, {RefObject, useEffect} from 'react';
import styled from "styled-components";
import {useQuery} from "@apollo/client";
import useInfinityScroll from "../../hooks/useInfinityScroll";
import {GET_ALL_TWEETS} from "../../graphql/queries/tweets";
import ExploreStore from "../../store/ExploreStore";
import {ITweet} from "../../types/interfaces/ITweet";
import Tweet from "../organism/Tweet";
import CenteredLoader from "../atoms/CenteredLoader";
import {useNavigate} from "react-router-dom";
import Alert from "../atoms/Alert";
import UserStore from "../../store/UserStore";
import {observer} from "mobx-react-lite";

const StyledExploreTweets = styled.div`
  border-top: 1px solid ${({theme}) => theme.colors.gray_thin};

  @media screen and ${({theme}) => theme.media.mobileL} {
    .tweet:last-child {
      margin-bottom: 70px;
    }
  }
`

interface IProps {
    transparentElementRef: RefObject<HTMLDivElement>
}

const ExploreTweets = observer(({transparentElementRef}: IProps) => {

    const navigate = useNavigate();

    const {data, loading, error} = useQuery(GET_ALL_TWEETS, {
        variables: {
            ProfileTweetsData: {
                userPseudonym: UserStore.pseudonym,
                limit: ExploreStore.limit,
                initialLimit: ExploreStore.initialLimit
            }
        }
    })



    useEffect(() => {
        window.scrollTo(0, ExploreStore.scrollPosition)
    }, [])

    useEffect(() => {
        function saveScrollPosition() {
            ExploreStore.setScrollPosition(window.scrollY)
        }

        document.addEventListener("scroll", saveScrollPosition)
        return () => {
            document.removeEventListener("scroll", saveScrollPosition)
        }
    }, [])

    useInfinityScroll(data?.getAllTweets?.hasMore, ExploreStore.limit, ExploreStore.initialLimit, () => {
        ExploreStore.increaseLimit();
    }, loading, transparentElementRef.current, [ExploreStore.tweets, ExploreStore.limit])

    useEffect(() => {
        if (!data?.getAllTweets?.tweets) return;
        ExploreStore.setTweets(data.getAllTweets.tweets);
    }, [data])


    return (
        <StyledExploreTweets>
            {ExploreStore.tweets.map((tweet: ITweet) => <Tweet key={tweet.id}
                                                               onClick={() => navigate(`/${tweet.userRef}/status/${tweet.id}`)}
                                                               className="tweet" {...tweet}/>)}
            {loading && <CenteredLoader/>}
            {error && <Alert text="Tweets fetch error" interval={5000}/>}
        </StyledExploreTweets>
    );
});

export default ExploreTweets;