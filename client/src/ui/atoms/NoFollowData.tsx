import React from 'react';
import styled from "styled-components";
import BirdsImage from "../../assets/birds.png"
import SubTitle from "./Typography/SubTitle";
import Paragraph from "./Typography/Paragraph";

const StyledNoFollowData = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px 10px 0 10px;
  flex-direction: column;
  text-align: center;
  gap: 10px;
`

interface IProps {
    isFollowingPage: boolean;
}

const NoFollowData = ({isFollowingPage}: IProps) => {


    return (
        <StyledNoFollowData>
            <img alt="" src={BirdsImage}/>
            <SubTitle>{isFollowingPage ? "You are currently not following anyone" : "Looking for followers?"}</SubTitle>
            <Paragraph>{isFollowingPage ? "Following accounts is an easy way to curate your timeline and know what’s happening with the topics and people you’re interested in." : "When someone follows this account, they’ll show up here. Tweeting and interacting with others helps boost followers."}</Paragraph>
        </StyledNoFollowData>
    );
};

export default NoFollowData;