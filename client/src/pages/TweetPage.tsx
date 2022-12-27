import React, {useEffect} from 'react';
import {useQuery} from "@apollo/client";
import {GET_USER} from "../graphql/queries/user";
import AnotherUserStore from "../store/AnotherUserStore";
import {useLocation, useNavigate} from "react-router-dom";
import CenteredLoader from "../ui/atoms/CenteredLoader";
import PageHeader from "../ui/molecules/PageHeader";
import H3Title from "../ui/atoms/Typography/H3Title";
import {GET_TWEET_BY_ID} from "../graphql/queries/tweets";
import Tweet from "../ui/organism/Tweet";
import DocumentTitle from "react-document-title";
import dayjs from "dayjs";
import Paragraph from "../ui/atoms/Typography/Paragraph";
import styled from "styled-components";
import CommentsWrapper from "../ui/molecules/CommentsWrapper";

const StyledTweetPage = styled.div`
  @media screen and ${({theme}) => theme.media.mobileL} {
    margin-bottom: 70px;
  }
`

const TweetInfoWrapper = styled.div`
  .tweetDate {
    color: #7B8892;
    margin-top: 10px;
  }
`


const TweetPage = () => {

        const {pathname} = useLocation();
        const navigate = useNavigate();

        const {loading, data, error} = useQuery(GET_USER, {
            variables: {
                pseudonym: pathname.slice(1, pathname.indexOf("/", 1) === -1 ? undefined : pathname.indexOf("/", 1))
            }
        })

        const {
            loading: tweetLoading,
            error: tweetError,
            data: tweetData
        } = useQuery(GET_TWEET_BY_ID, {variables: {tweetId: pathname.slice(pathname.lastIndexOf("/") + 1)}});

        useEffect(() => {
            if (error || tweetError) return navigate("/home")
            if (data) AnotherUserStore.setAnotherUser(data.getUser.pseudonym, data.getUser.username);
        }, [error, data, tweetError])


        if (tweetLoading || !tweetData?.getTweetById) return <CenteredLoader/>


        return (
            <StyledTweetPage>
                {loading || error ? <CenteredLoader/> : <React.Fragment>
                    <DocumentTitle title={`Tweet of ${tweetData.getTweetById.userRef}`}/>
                    <PageHeader content={<H3Title>Tweet</H3Title>}/>
                    <Tweet {...tweetData.getTweetById} body={<TweetInfoWrapper>
                        <Paragraph
                            className="tweetDate">{dayjs(tweetData.getTweetById.createdAt).format('hh:mm A · MMM D, YYYY')}</Paragraph>
                    </TweetInfoWrapper>}/>
                </React.Fragment>}
                <CommentsWrapper tweetId={tweetData.getTweetById.id} userPseudonym={tweetData.getTweetById.userRef}/>
            </StyledTweetPage>
        );
    }
;

export default TweetPage;