import React, {useRef, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {regular, solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import Paragraph from "../atoms/Typography/Paragraph";
import styled from "styled-components";
import Popover from "./Popover";
import TweetShare from "../atoms/TweetShare";
import formatNumber from "../../helpers/formatNumber";
import {ICommunicate} from "../../types/interfaces/ICommunicate";
import {ApolloQueryResult, useMutation} from "@apollo/client";
import {LIKE_TWEET} from "../../graphql/mutations/likes";
import {RETWEET} from '../../graphql/mutations/retweet';
import {ADD_BOOKMARK} from "../../graphql/mutations/bookmarks";
import Loader from "../atoms/Loader";
import Alert from "../atoms/Alert";

const StyledTweetCommunicationSection = styled.section`
  display: flex;
  margin-top: 10px;
  justify-content: space-between;

  span {
    position: relative;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: 0.2s all;
  }

  svg {
    color: #8B98A5;
    margin-right: 5px;
    border-radius: 50%;
    padding: 10px;
  }

  .tweetShare:hover > svg:hover {
    color: ${({theme}) => theme.colors.main};
    background-color: ${({theme}) => theme.colors.main_thin};
  }

  .tweetComment:hover {
    svg {
      color: ${({theme}) => theme.colors.main};
      background-color: ${({theme}) => theme.colors.main_thin};
    }

    color: ${({theme}) => theme.colors.main};
  }

  @media screen and ${({theme}) => theme.media.mobileL} {
    margin-left: -50px;
  }
`

const LikeButton = styled.span<LikeButtonProps>`
  position: relative;
  display: inline-block;
  min-width: 50px;

  .heartIcon {
    color: ${({isActive, theme}) => isActive && theme.colors.danger_red}
  }

  .likeLoader {
    position: absolute;
    top: 0;
    right: -50%;
    color: ${({theme}) => theme.colors.danger_red};
  }

  &:hover {
    .heartIcon {
      color: ${({theme}) => theme.colors.danger_red};
      background-color: ${({theme}) => theme.colors.danger_red_thin};
    }

    color: ${({theme}) => theme.colors.danger_red};
  }

  ${({isActive, theme}) => isActive && `
    color: ${theme.colors.danger_red};
   .retweetIcon {
    color: ${theme.colors.danger_red};
    }
  `}
`

const RetweetButton = styled(LikeButton)<LikeButtonProps>`
  .retweetLoader {
    position: absolute;
    top: 0;
    right: -50%;
    color: #19C088;
  }

  &:hover {
    .retweetIcon {
      color: #19C088;
      background-color: rgb(25, 192, 136, 0.2);
    }

    color: #19C088;
  }

  ${({isActive}) => isActive && `
    color: #19C088;
   .retweetIcon {
    color: #19C088;
    }
  `}
`

interface LikeButtonProps {
    isActive: boolean;
}

interface IProps {
    data: ICommunicate;
    creator: string;
    tweetId: string;
    refetch: () => Promise<ApolloQueryResult<any>>;
}

const TweetCommunicationSection = ({data, creator, tweetId, refetch}: IProps) => {

    const [isLoading, setLoadingState] = useState<"likes" | "retweets" | "bookmark" | false>(false);
    const [isTweetShareActive, setTweetShareState] = useState(false);
    const [bookmarkMessageState, setMessageState] = useState(false);
    const shareRef = useRef(null);
    const [likeTweet] = useMutation(LIKE_TWEET);
    const [retweet] = useMutation(RETWEET);
    const [addBookmark] = useMutation(ADD_BOOKMARK);


    return (
        <StyledTweetCommunicationSection className="tweetCommunication">
                    <span className="tweetComment">
                        <FontAwesomeIcon icon={regular("comment")}/>
                         <Paragraph>{formatNumber(data.comments)}</Paragraph>
                    </span>
            <RetweetButton  onClick={async (e) => {
                e.stopPropagation();
                setLoadingState("retweets")
                await retweet({variables: {tweetId}})
                await refetch();
                setLoadingState(false)
            }} isActive={data.isUserRetweeted} className="tweetRetweet">
                <FontAwesomeIcon className="retweetIcon" icon={solid("retweet")}/>
                <Paragraph>{isLoading === "retweets" ? <FontAwesomeIcon className="retweetLoader" spin
                                                                        icon={solid("spinner")}/> : formatNumber(data.retweets)}</Paragraph>
            </RetweetButton>
            <LikeButton  onClick={async (e) => {
                e.stopPropagation();
                setLoadingState("likes")
                await likeTweet({variables: {tweetRef: tweetId}})
                await refetch();
                setLoadingState(false)
            }} isActive={data.isUserLiked} className="tweetLike">
                <FontAwesomeIcon className="heartIcon" icon={data.isUserLiked ? solid("heart") : regular("heart")}/>
                <Paragraph>{isLoading === "likes" ? <FontAwesomeIcon className="likeLoader" spin
                                                                     icon={solid("spinner")}/> : formatNumber(data.likes)}</Paragraph>
            </LikeButton>
            <span ref={shareRef} className="tweetShare">
                <FontAwesomeIcon onClick={(e) => {
                    setTweetShareState(true)
                    e.stopPropagation();
                }} icon={solid("arrow-up-from-bracket")}/>
                  <Popover parentRef={shareRef} top={200} arrowPosition="top" left={-230} width="300px" isActive={isTweetShareActive}
                           closePopover={() => setTweetShareState(false)} body={<TweetShare
                      bookmarkCallback={async (e) => {
                          e.stopPropagation();
                          setLoadingState("bookmark")
                          await addBookmark({variables: {tweetId}})
                          await refetch();
                          setMessageState(true);
                          setTimeout(() => setMessageState(false), 3000)
                          setTweetShareState(false);
                          setLoadingState(false);
                      }}
                      isTweetBookmarked={data.isTweetBookmarked}
                      tweetPath={`${process.env.REACT_APP_LINK}/${creator}/status/${tweetId}`}
                      closeTweetShare={(e) => {
                          setTweetShareState(false)
                          e.stopPropagation();
                      }}/>}/>
            </span>
            {isLoading === "bookmark" && <Loader/>}
            {bookmarkMessageState && <Alert text={data.isTweetBookmarked ? "Tweet added to your Bookmarks" : "Tweet removed from your Bookmarks"} interval={3000}/>}
        </StyledTweetCommunicationSection>
    );
};

export default TweetCommunicationSection;