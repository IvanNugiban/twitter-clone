import React, {useEffect, useRef} from 'react';
import {useQuery} from "@apollo/client";
import {GET_PROFILE_TWEETS} from "../graphql/queries/tweets";
import ProfileTweetsStore from "../store/ProfileTweetsStore";
import {observer} from "mobx-react-lite";
import useInfinityScroll from "../hooks/useInfinityScroll";
import TransparentElement from "../ui/atoms/TransparentElement";
import CenteredLoader from "../ui/atoms/CenteredLoader";
import {ITweet} from "../types/interfaces/ITweet";
import Tweet from "../ui/organism/Tweet";
import {useLocation, useNavigate} from "react-router-dom";
import Paragraph from "../ui/atoms/Typography/Paragraph";
import Button from "../ui/atoms/Button";
import SubTitle from "../ui/atoms/Typography/SubTitle";
import styled from "styled-components";
import UserStore from "../store/UserStore";
import AnotherUserStore from "../store/AnotherUserStore";

const NoTweetsMessage = styled.div`
  margin: 20px auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  width: 300px;
`

const ProfileTweetsPage = observer(() => {

    const {pathname} = useLocation();

    const {data, loading, error, refetch, client} = useQuery(GET_PROFILE_TWEETS, {
        variables: {
            ProfileTweetsData: {
                limit: ProfileTweetsStore.limit,
                initialLimit: ProfileTweetsStore.initialLimit,
                userPseudonym: pathname.slice(1) === UserStore.pseudonym ? UserStore.pseudonym : AnotherUserStore.anotherUserPseudonym
            }
        }
    })
    const navigate = useNavigate();
    const transparentElementRef = useRef(null);

    useEffect(() => {
        if (!data?.getProfileTweets?.tweets) return;
        ProfileTweetsStore.setTweets(data.getProfileTweets.tweets);
    }, [data])

    useInfinityScroll(data?.getProfileTweets?.hasMore, ProfileTweetsStore.limit, ProfileTweetsStore.initialLimit, () => {
        ProfileTweetsStore.increaseLimit();
    }, loading, transparentElementRef.current, [ProfileTweetsStore.tweets, ProfileTweetsStore.limit])

    if (error || !data?.getProfileTweets?.tweets && !loading) return <NoTweetsMessage>
        <SubTitle>You don’t have any tweets yet</SubTitle>
        <Paragraph>You can create them at the home page</Paragraph>
        <Button onClick={() => navigate("/home")}>Create tweet</Button>
    </NoTweetsMessage>;

    return (
        <React.Fragment>
            {loading && <CenteredLoader/>}
            {ProfileTweetsStore.tweets.map((tweet: ITweet) => <Tweet deletable={pathname === `/${UserStore.pseudonym}`} deleteCallback={() => {
                ProfileTweetsStore.reset();
                client.resetStore();
                refetch();
            }} key={tweet.id}
                                                                    onClick={() => navigate(`/${tweet.userRef}/status/${tweet.id}`)} {...tweet} />)}
            <TransparentElement ref={transparentElementRef}/>
            </React.Fragment>
    );
});

export default ProfileTweetsPage;