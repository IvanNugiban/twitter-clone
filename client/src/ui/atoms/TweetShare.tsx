import React from 'react';
import H6Title from "./Typography/H6Title";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import styled from "styled-components";

const TweetShareItem = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  color: ${({theme}) => theme.colors.black};

  svg {
    color: ${({theme}) => theme.colors.black} !important;
  }

  &:hover {
    background-color: ${({theme}) => theme.colors.gray_thin};
  }
`

interface IProps {
    closeTweetShare: (e: React.MouseEvent<HTMLButtonElement>) => void;
    tweetPath: string;
    isTweetBookmarked: boolean;
    bookmarkCallback: (e: React.MouseEvent) => void;
}

const TweetShare = ({closeTweetShare, tweetPath, isTweetBookmarked, bookmarkCallback}: IProps) => {
    return (
        <ul>
            <li>
                <TweetShareItem onClick={(e) => {
                    navigator.clipboard.writeText(tweetPath);
                    closeTweetShare(e);
                }}>
                    <FontAwesomeIcon fontSize="1.1rem" icon={solid("link")}/>
                    <H6Title>Copy link to tweet</H6Title>
                </TweetShareItem>
            </li>
            <li>
                <TweetShareItem onClick={(e) => {
                    navigator.share({url: tweetPath})
                    closeTweetShare(e);
                }}>
                    <FontAwesomeIcon fontSize="1.1rem" icon={solid("arrow-up-from-bracket")}/>
                    <H6Title>Share tweet via...</H6Title>
                </TweetShareItem>
            </li>
            <li onClick={(e) => bookmarkCallback(e)}>
                {isTweetBookmarked ? <TweetShareItem>
                    <FontAwesomeIcon fontSize="1.1rem" icon={solid("bookmark")}/>
                    <H6Title>Remove tweet from bookmarks</H6Title>
                </TweetShareItem> : <TweetShareItem>
                    <FontAwesomeIcon fontSize="1.1rem" icon={solid("bookmark")}/>
                    <H6Title>Bookmark</H6Title>
                </TweetShareItem>}
            </li>
        </ul>
    );
};

export default TweetShare;