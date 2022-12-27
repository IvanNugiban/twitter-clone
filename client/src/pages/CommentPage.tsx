import React, {useEffect} from 'react';
import PageHeader from "../ui/molecules/PageHeader";
import H3Title from "../ui/atoms/Typography/H3Title";
import {useQuery} from "@apollo/client";
import {GET_USER} from "../graphql/queries/user";
import {useLocation, useNavigate} from "react-router-dom";
import CenteredLoader from "../ui/atoms/CenteredLoader";
import {GET_COMMENT_BY_ID} from "../graphql/queries/comments";
import AnotherUserStore from "../store/AnotherUserStore";
import DocumentTitle from "react-document-title";
import Tweet from "../ui/organism/Tweet";
import Paragraph from "../ui/atoms/Typography/Paragraph";
import dayjs from "dayjs";
import styled from "styled-components";
import CommentsWrapper from "../ui/molecules/CommentsWrapper";

const Wrapper = styled.div`
    .comment {
      padding-top: 10px;
    }
`

const CommentInfoWrapper = styled.div`
  .commentDate {
    color: #7B8892;
    margin-top: 10px;
  }
`

const CommentPage = () => {

    const {pathname} = useLocation();
    const navigate = useNavigate();

    const {loading, data, error} = useQuery(GET_USER, {
        variables: {
            pseudonym: pathname.slice(1, pathname.indexOf("/", 1) === -1 ? undefined : pathname.indexOf("/", 1))
        }
    })

    const {
        loading: commentLoading,
        error: commentError,
        data: commentData
    } = useQuery(GET_COMMENT_BY_ID, {variables: {commentId: pathname.slice(pathname.lastIndexOf("/") + 1)}});


    useEffect(() => {
        if (error || commentError) return navigate("/home")
        if (data) AnotherUserStore.setAnotherUser(data.getUser.pseudonym, data.getUser.username);
    }, [error, data, commentError])


    if (commentLoading || !commentData?.getCommentById) return <CenteredLoader/>

    return (
        <React.Fragment>
            {(loading || error) ? <CenteredLoader/> : <Wrapper>
                <DocumentTitle title={`Tweet of ${commentData.getCommentById.userRef}`}/>
                <PageHeader content={<H3Title>Comment</H3Title>}/>
                <Tweet className="comment" {...commentData.getCommentById} body={<CommentInfoWrapper>
                    <Paragraph
                        className="commentDate">{dayjs(commentData.getCommentById.createdAt).format('hh:mm A · MMM D, YYYY')}</Paragraph>
                </CommentInfoWrapper>}/>
            </Wrapper>
            }
            <CommentsWrapper tweetId={commentData.getCommentById.id}
                             userPseudonym={commentData.getCommentById.userRef}/>
        </React.Fragment>
    );
};

export default CommentPage;