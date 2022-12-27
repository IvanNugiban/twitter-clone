import React, {useEffect, useRef} from 'react';
import {observer} from "mobx-react-lite";
import {useLocation, useNavigate} from "react-router-dom";
import {useQuery} from "@apollo/client";
import {GET_RETWEETS} from "../graphql/queries/tweets";
import ProfileTweetsStore from "../store/ProfileTweetsStore";
import UserStore from "../store/UserStore";
import AnotherUserStore from "../store/AnotherUserStore";
import useInfinityScroll from "../hooks/useInfinityScroll";
import SubTitle from "../ui/atoms/Typography/SubTitle";
import Paragraph from "../ui/atoms/Typography/Paragraph";
import CenteredLoader from "../ui/atoms/CenteredLoader";
import {ITweet} from "../types/interfaces/ITweet";
import Tweet from "../ui/organism/Tweet";
import TransparentElement from "../ui/atoms/TransparentElement";
import styled from "styled-components";


const NoRetweetsMessage = styled.div`
  margin: 20px auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  width: 300px;
`

const ProfileRetweetsPage = observer(() => {

    const {pathname} = useLocation();


    const {data, loading, error} = useQuery(GET_RETWEETS, {
        variables: {
            ProfileTweetsData: {
                limit: ProfileTweetsStore.retweetsLimit,
                initialLimit: ProfileTweetsStore.initialLimit,
                userPseudonym: pathname.slice(1, pathname.indexOf("/", 2)) === UserStore.pseudonym ? UserStore.pseudonym : AnotherUserStore.anotherUserPseudonym
            }
        }
    })
    const navigate = useNavigate();
    const transparentElementRef = useRef(null);

    useEffect(() => {
        if (!data?.getRetweets?.tweets) return;
        ProfileTweetsStore.setRetweets(data.getRetweets.tweets);
    }, [data])

    useInfinityScroll(data?.getRetweets?.hasMore, ProfileTweetsStore.retweetsLimit, ProfileTweetsStore.initialLimit, () => {
        ProfileTweetsStore.increaseRetweetsLimit();
    }, loading, transparentElementRef.current, [ProfileTweetsStore.retweets, ProfileTweetsStore.retweetsLimit])

    if (error || !data?.getRetweets?.tweets && !loading) return <NoRetweetsMessage>
        <SubTitle>You don’t have any retweets yet</SubTitle>
        <Paragraph>Click the corresponding button on another user's tweet to retweet</Paragraph>
    </NoRetweetsMessage>;

    return (
        <React.Fragment>
            {loading && <CenteredLoader/>}
            {ProfileTweetsStore.retweets.map((tweet: ITweet) =>
                <Tweet key={tweet.id} onClick={() => navigate(`/${tweet.userRef}/status/${tweet.id}`)} {...tweet} />)}
            <TransparentElement ref={transparentElementRef}/>
            </React.Fragment>
    );
});

export default ProfileRetweetsPage;