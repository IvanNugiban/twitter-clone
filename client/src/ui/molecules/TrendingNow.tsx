import React from 'react';
import styled from "styled-components";
import H4Title from "../atoms/Typography/H4Title";
import {useQuery} from "@apollo/client";
import {GET_RANDOM_HASHTAGS} from "../../graphql/queries/hashtags";
import CenteredLoader from "../atoms/CenteredLoader";
import {IHashtag} from "../../types/interfaces/IHashtag";
import H6Title from "../atoms/Typography/H6Title";
import Paragraph from "../atoms/Typography/Paragraph";
import formatNumber from "../../helpers/formatNumber";
import { Link } from 'react-router-dom';

const StyledTrendingNow = styled.section<IProps>`
  border-radius: 20px;
  padding-top: 15px;
  background-color: ${({theme, withBackground}) => withBackground && theme.colors.gray_thin};
  
  
  h4 {
    padding-left: 15px;
    margin-bottom: 10px;
  }
`

const HashtagItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  
  &:hover {
    background-color: rgba(203, 204, 206, 0.50);
  }
`

interface IProps {
    withBackground?: boolean;
}

const TrendingNow = ({withBackground = true} : IProps) => {

    const {data, loading} = useQuery(GET_RANDOM_HASHTAGS);


    return (
        <StyledTrendingNow withBackground={withBackground}>
            <H4Title>Trends for you</H4Title>
            {loading ? <CenteredLoader/> :
                data?.getRandomHashtags?.map((hashtagData: IHashtag) => <Link key={hashtagData.hashtag} to={`/search/tweets?q=${hashtagData.hashtag.slice(1)}`}><HashtagItem >
                    <H6Title>{hashtagData.hashtag}</H6Title>
                    <Paragraph>{formatNumber(hashtagData.numberOfTweets)} {hashtagData.numberOfTweets === 1 ? "Tweet" : "Tweets"}</Paragraph>
                </HashtagItem></Link>)
            }
        </StyledTrendingNow>
    );
};

export default TrendingNow;