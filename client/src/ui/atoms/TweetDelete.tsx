import React from 'react';
import styled from "styled-components";
import H4Title from "./Typography/H4Title";
import Paragraph from "./Typography/Paragraph";
import Button from "./Button";
import {useMutation} from "@apollo/client";
import {DELETE_TWEET} from "../../graphql/mutations/tweets";
import Loader from "./Loader";
import Alert from "./Alert";

const StyledTweetDelete = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  text-align: center;
  padding: 20px;
  button {
    max-width: 300px;
  }
`

interface IProps {
    tweetId: string;
    finish: () => void;
    deleteCallback: () => void;
}

const TweetDelete = ({tweetId, finish, deleteCallback}: IProps) => {

    const [deleteTweet ,{loading, error}] = useMutation(DELETE_TWEET);

    return (
        <StyledTweetDelete>
            <H4Title>Delete Tweet?</H4Title>
            <Paragraph>This can’t be undone and it will be removed from your profile, the timeline of any accounts that
                follow you, and from Twitter search results. </Paragraph>
            <Button type="danger" onClick={async () => {
                await deleteTweet({variables: {
                    tweetId
                    }})
                deleteCallback();
                finish();
            }}>Delete</Button>
            <Button onClick={finish}>Cancel</Button>
            {loading && <Loader/>}
            {error && <Alert text={error.message} interval={3000}/>}
        </StyledTweetDelete>
    );
};

export default TweetDelete;