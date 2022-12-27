import React, {useState} from 'react';
import {ITweet} from "../../types/interfaces/ITweet";
import styled from "styled-components";
import {useQuery} from "@apollo/client";
import {GET_USER} from "../../graphql/queries/user";
import Avatar from "../atoms/Avatar";
import H6Title from "../atoms/Typography/H6Title";
import Paragraph from "../atoms/Typography/Paragraph";
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import Alert from "../atoms/Alert";
import TweetCreatorMedia from "../molecules/TweetCreatorMedia";
import {useNavigate} from "react-router-dom";
import enlargedPicture from "../../hoc/EnlargedPicture";
import TweetCommunicationSection from "../molecules/TweetCommunicationSection";
import TweetText from "../atoms/TweetText";
import {GET_COMMUNICATE_DATA} from "../../graphql/queries/tweets";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import PopUp from "../molecules/PopUp";
import TweetDelete from "../atoms/TweetDelete";

TimeAgo.addLocale(en)
const timeAgo = new TimeAgo('en-US')


const StyledTweet = styled.article<TweetProps>`
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 7px 20px;
  border-top: 1px solid ${({theme}) => theme.colors.gray_thin};
  border-bottom: 1px solid ${({theme}) => theme.colors.gray_thin};
  transition: 0.5s background-color;
  cursor: ${({clickable}) => clickable && "pointer"};
  word-wrap: break-word;

  &.comment {
    padding-top: 40px;
    .tweetCommunication {
      gap: 20px;
      justify-content: stretch;
    }
    
    .tweetRetweet,
    .tweetShare {
      display: none;
    }
  }

  .tweetAvatar {
    min-width: 40px;
    max-width: 40px;
    min-height: 40px;
    max-height: 40px;
  }

  ${({clickable, theme}) => clickable && `&:hover {
    background-color: ${theme.colors.gray_thin};
    transition: 0.5s background-color;
  }`}
`

const TweetContent = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 5px;

  ${() => {
    let sumString = ``;
    for (let i = 14; i >= 0; i--) {
      if (i <= 10) {
        sumString += `@media screen and (max-width: ${50 * i}px) {
        width: ${50 * i - 140}px;
        }`
        continue
      }
      sumString += `@media screen and (max-width: ${50 * i}px) {
        width: ${50 * i - 250}px;
    }`
    }
    return sumString
  }};

  img {
    margin-top: 10px;
  }

  video {
    margin-top: 10px;
    max-height: 500px;
    border-radius: 10px;
    object-fit: cover;
  }
`

const TweetCreatorInfo = styled.span`
  display: flex;
  gap: 5px;
  text-align: left;

  h6:hover {
    cursor: pointer;
    text-decoration: underline;
  }

  * {
    display: block;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  p {
    color: #677681;
  }
`


const TweetImage = styled.img`

  max-height: 500px;
  border-radius: 10px;
  object-fit: cover;
  min-width: 100%;
`

const DeleteTweetButton = styled.button`
  position: absolute;
  right: 5px;
  top: 5px;
  border-radius: 50%;
  padding: 5px 10px;

  &:hover {
    background-color: ${({theme}) => theme.colors.danger_red_thin};
  }

  svg {
    color: ${({theme}) => theme.colors.danger_red};
  }
`


const EnlargedTweetImage = enlargedPicture(TweetImage);

interface TweetProps {
    clickable: boolean;
}

interface IProps extends ITweet {
    className?: string;
    onClick?: () => void;
    body?: React.ReactNode;
    deletable?: boolean;
    deleteCallback?: () => void;
}


const Tweet = ({
                   text,
                   media,
                   gif,
                   createdAt,
                   userRef,
                   className,
                   onClick,
                   id,
                   body,
                   deletable = false,
                   deleteCallback
               }: IProps) => {


    const [isDeletingActive, setDeletingState] = useState(false);

    const {data, loading, error} = useQuery(GET_USER, {
        variables: {
            pseudonym: userRef
        }
    })
    const {
        data: communicateData,
        loading: communicateDataLoading,
        error: communicateDataError,
        refetch
    } = useQuery(GET_COMMUNICATE_DATA, {
        variables: {
            tweetId: id
        }
    })
    const navigate = useNavigate();

    if (error || communicateDataError) return <Alert text="Tweet loading error" interval={3000}/>
    if (loading || communicateDataLoading) return <div style={{height: "400px"}}></div>;

    return (
        <React.Fragment>
            <StyledTweet clickable={!!onClick} onClick={onClick} className={className}>
                <Avatar onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/${userRef}`)
                }} className="tweetAvatar" avatar={data.getUser.avatar}/>
                <TweetContent>
                    <TweetCreatorInfo>
                        <H6Title onClick={() => navigate(`/${userRef}`)}>{data.getUser.username}</H6Title>
                        <Paragraph>@{userRef} · </Paragraph>
                        <Paragraph>{timeAgo.format(new Date(createdAt))}</Paragraph>
                    </TweetCreatorInfo>
                    <TweetText text={text}/>
                    {media.length > 0 && <TweetCreatorMedia media={media}/>}
                    {gif && <EnlargedTweetImage alt="" src={gif}/>}
                    {body}
                    {deletable &&
                        <DeleteTweetButton onClick={(e) => {
                            e.stopPropagation();
                            setDeletingState(true);
                        }
                        }><FontAwesomeIcon fontSize="1rem" icon={solid("trash")}/></DeleteTweetButton>}
                    <TweetCommunicationSection refetch={() => refetch()} data={communicateData.getCommunicateData}
                                               creator={userRef} tweetId={id}/>
                </TweetContent>
            </StyledTweet>
            {(isDeletingActive && deleteCallback) &&
                <PopUp withPadding={false} height="300px" width="320px"
                       closePopUp={() => setDeletingState(false)}><TweetDelete
                    tweetId={id} deleteCallback={() => deleteCallback()}
                    finish={() => setDeletingState(false)}/></PopUp>}
        </React.Fragment>
    );
};

export default Tweet;