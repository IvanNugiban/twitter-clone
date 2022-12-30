import React, {useEffect, useRef} from 'react';
import {ITweet} from "../../types/interfaces/ITweet";
import Tweet from "../organism/Tweet";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import TweetCreator from "../organism/TweetCreator";
import {useMutation, useQuery} from "@apollo/client";
import {GET_ALL_COMMENTS} from "../../graphql/queries/comments";
import {CREATE_COMMENT} from "../../graphql/mutations/comments";
import CenteredLoader from "../atoms/CenteredLoader";
import Loader from "../atoms/Loader";
import Alert from "../atoms/Alert";
import {observer} from "mobx-react-lite";
import TweetPageStore from "../../store/TweetPageStore";
import TransparentElement from "../atoms/TransparentElement";
import useInfinityScroll from "../../hooks/useInfinityScroll";


const CommentCreator = styled(TweetCreator)`
  padding-top: 40px;
`

const ReplyingTo = styled.div`
  position: absolute;
  z-index: 5;
  top: 10px;
  left: 50px;
  cursor: pointer;

  span {
    color: ${({theme}) => theme.colors.main};
  }
`

interface IProps {
    tweetId: string;
    userPseudonym: string;
}

const CommentWrapper = styled.div`
  position: relative;
`

const CommentsWrapper = observer(({tweetId, userPseudonym}: IProps) => {

        const navigate = useNavigate();

        const {loading: commentsLoading, data: comments, refetch} = useQuery(GET_ALL_COMMENTS, {
            variables: {
                CommentData: {
                    tweetId: tweetId,
                    limit: TweetPageStore.commentsLimit,
                    initialLimit: TweetPageStore.initialLimit
                }
            }
        });


        useEffect(() => {
            TweetPageStore.reset();
            return () => {
                TweetPageStore.reset();
            }
        }, [tweetId])

        const transparentElementRef = useRef(null);
        const [createComment, {loading: commentCreationLoading, error: commentCreationError}] = useMutation(CREATE_COMMENT);


        useEffect(() => {
            if (!comments?.getAllComments?.comments) return;
            TweetPageStore.setComments(comments.getAllComments.comments);
        }, [comments])


        useInfinityScroll(comments?.getAllComments?.hasMore, TweetPageStore.commentsLimit, TweetPageStore.initialLimit, () => {
            TweetPageStore.increaseLimit();
        }, commentsLoading, transparentElementRef.current, [TweetPageStore.comments, TweetPageStore.commentsLimit])

        return (
            <React.Fragment>
                <CommentWrapper>
                    <CommentCreator successText="Comment created!" callback={async (tweetText, media, gif) => {
                        const response = await createComment({
                            variables: {
                                commentData: {
                                    tweetRef: tweetId,
                                    text: tweetText.trim(),
                                    media,
                                    gif,
                                    createdAt: new Date().toString()
                                }
                            }
                        })
                        if (response) {
                            TweetPageStore.reset();
                            refetch();
                        }
                        return !!response;
                    }} inputPlaceholder="Tweet your reply" buttonText="Reply"/>
                    <ReplyingTo>Replying to <span
                        onClick={() => navigate(`/${userPseudonym}`)}>@{userPseudonym}</span></ReplyingTo>
                    {TweetPageStore.comments.map((comment: ITweet) => <CommentWrapper key={comment.id}>
                        <ReplyingTo>Replying to <span
                            onClick={() => navigate(`/${userPseudonym}`)}>@{userPseudonym}</span></ReplyingTo>
                        <Tweet
                            onClick={() => navigate(`/${comment.userRef}/comment/${comment.id}`)}
                            className="comment"  {...comment}/></CommentWrapper>)}
                    <TransparentElement ref={transparentElementRef}/>
                </CommentWrapper>
                {commentsLoading && <CenteredLoader/>}
                {commentCreationLoading && <Loader/>}
                {commentCreationError && <Alert text={commentCreationError.message} interval={3000}/>}
            </React.Fragment>
        );
    })
;

export default CommentsWrapper;