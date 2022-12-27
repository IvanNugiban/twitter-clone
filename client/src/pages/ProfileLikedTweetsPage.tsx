import React, {useEffect, useRef} from 'react';
import {observer} from "mobx-react-lite";
import {useQuery} from "@apollo/client";
import {GET_LIKED_TWEETS, GET_TWEETS_WITH_MEDIA} from "../graphql/queries/tweets";
import ProfileTweetsStore from "../store/ProfileTweetsStore";
import {useLocation, useNavigate} from "react-router-dom";
import useInfinityScroll from "../hooks/useInfinityScroll";
import CenteredLoader from "../ui/atoms/CenteredLoader";
import {ITweet} from "../types/interfaces/ITweet";
import Tweet from "../ui/organism/Tweet";
import TransparentElement from "../ui/atoms/TransparentElement";
import UserStore from "../store/UserStore";
import AnotherUserStore from "../store/AnotherUserStore";
import SubTitle from "../ui/atoms/Typography/SubTitle";
import Paragraph from "../ui/atoms/Typography/Paragraph";
import styled from "styled-components";

const NoTweetsWithLikes = styled.div`
  margin: 20px auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  width: 300px;
`

const ProfileLikedTweetsPage = observer(() => {

    const {pathname} = useLocation();

    const {data, loading, error} = useQuery(GET_LIKED_TWEETS, {
        variables: {
            ProfileTweetsData: {
                limit: ProfileTweetsStore.likedTweetsLimit,
                initialLimit: ProfileTweetsStore.initialLimit,
                userPseudonym: pathname.slice(1, pathname.indexOf("/",2)) === UserStore.pseudonym ? UserStore.pseudonym : AnotherUserStore.anotherUserPseudonym
            }
        }
    })

    const navigate = useNavigate();
    const transparentElementRef = useRef(null);


    useEffect(() => {
        if (!data?.getLikedTweets?.tweets) return;
        ProfileTweetsStore.setLikedTweets(data.getLikedTweets.tweets);
    }, [data])

    useInfinityScroll(data?.getLikedTweets?.hasMore, ProfileTweetsStore.likedTweetsLimit, ProfileTweetsStore.initialLimit, () => {
        ProfileTweetsStore.increaseLikedTweetsLimit();
    }, loading, transparentElementRef.current, [ProfileTweetsStore.likedTweets, ProfileTweetsStore.likedTweetsLimit])

    if (error || !data?.getLikedTweets?.tweets && !loading) return <NoTweetsWithLikes>
        <SubTitle>You don’t have any likes yet</SubTitle>
        <Paragraph>Tap the heart on any Tweet to show it some love. When you do, it’ll show up here.</Paragraph>
    </NoTweetsWithLikes>;

    return (
        <React.Fragment>
            {loading && <CenteredLoader/>}
            {ProfileTweetsStore.likedTweets.map((tweet: ITweet) => <Tweet key={tweet.id}
                                                                     onClick={() => navigate(`/${tweet.userRef}/status/${tweet.id}`)} {...tweet} />)}
            <TransparentElement ref={transparentElementRef}/>
            </React.Fragment>
    );
});

export default ProfileLikedTweetsPage;