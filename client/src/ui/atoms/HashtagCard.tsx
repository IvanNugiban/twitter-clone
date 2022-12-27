import React from 'react';
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import H6Title from "./Typography/H6Title";
import Paragraph from "./Typography/Paragraph";
import formatNumber from "../../helpers/formatNumber";

interface IProps {
    hashtag: string;
    numberOfTweets: number;
    callback: () => void;
}

const StyledHashtagCard = styled.div`
  display: flex;
  align-items: center;
  align-self:flex-end;
  padding: 20px;
  transition: 0.5s all;
  gap: 10px;
  cursor: pointer;

  &:hover {
    transition: 0.5s all;
    background-color: ${({theme}) => theme.colors.gray_thin};
  }
`

const HashtagCard = ({hashtag, numberOfTweets, callback}: IProps) => {
    return (
        <StyledHashtagCard onClick={callback}>
            <FontAwesomeIcon fontSize="1.7rem" icon={solid("magnifying-glass")}/>
            <span>
                <H6Title>{hashtag}</H6Title>
                <Paragraph>{formatNumber(numberOfTweets)} Tweets</Paragraph>
            </span>
        </StyledHashtagCard>
    );
};

export default HashtagCard;