import React, {useEffect, useRef} from 'react';
import {observer} from "mobx-react-lite";
import {useQuery} from "@apollo/client";
import {GET_TWEETS_WITH_MEDIA} from "../graphql/queries/tweets";
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

const NoTweetsWithMedia = styled.div`
  margin: 20px auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  width: 300px;
`

const ProfileTweetsWithMedia = observer(() => {

    const {pathname} = useLocation();

    const {data, loading, error, client, refetch} = useQuery(GET_TWEETS_WITH_MEDIA, {
        variables: {
            ProfileTweetsData: {
                limit: ProfileTweetsStore.tweetsWithMediaLimit,
                initialLimit: ProfileTweetsStore.initialLimit,
                userPseudonym: pathname.slice(1, pathname.indexOf("/",2)) === UserStore.pseudonym ? UserStore.pseudonym : AnotherUserStore.anotherUserPseudonym
            }
        }
    })

    const navigate = useNavigate();
    const transparentElementRef = useRef(null);


    useEffect(() => {
        if (!data?.getTweetsWithMedia?.tweets) return;
        ProfileTweetsStore.setTweetsWithMedia(data.getTweetsWithMedia.tweets);
    }, [data])

    useInfinityScroll(data?.getTweetsWithMedia?.hasMore, ProfileTweetsStore.tweetsWithMediaLimit, ProfileTweetsStore.initialLimit, () => {
        ProfileTweetsStore.increaseTweetsWithMediaLimit();
    }, loading, transparentElementRef.current, [ProfileTweetsStore.tweetsWithMedia, ProfileTweetsStore.tweetsWithMediaLimit])

    if (error || !data?.getTweetsWithMedia?.tweets && !loading) return <NoTweetsWithMedia>
        <SubTitle>Lights, camera … attachments!</SubTitle>
        <Paragraph>When you send Tweets with photos or videos in them, they will show up here.</Paragraph>
    </NoTweetsWithMedia>;

    return (
        <React.Fragment>
            {loading && <CenteredLoader/>}
            {ProfileTweetsStore.tweetsWithMedia.map((tweet: ITweet) => <Tweet deletable={pathname === `/${UserStore.pseudonym}/media`} deleteCallback={() => {
                ProfileTweetsStore.reset();
                client.resetStore();
                refetch();
            }} key={tweet.id}
                                                                          onClick={() => navigate(`/${tweet.userRef}/status/${tweet.id}`)} {...tweet} />)}
            <TransparentElement ref={transparentElementRef}/>
            </React.Fragment>
    );
});

export default ProfileTweetsWithMedia;