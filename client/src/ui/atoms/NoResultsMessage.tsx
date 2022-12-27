import React from 'react';
import styled from "styled-components";
import NoResultPng from "../../assets/noResults.png"
import SubTitle from "./Typography/SubTitle";
import Paragraph from "./Typography/Paragraph";

const StyledNoResultsMessage = styled.div`
  margin: 50px auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 300px;
  word-wrap: break-word;
`

interface IProps {
    text: string;
}

const NoResultsMessage = ({text} : IProps) => {
    return (
        <StyledNoResultsMessage>
            <img src={NoResultPng} alt="No results"/>
            <SubTitle>No results for "{text}"</SubTitle>
            <Paragraph>Try searching for something else</Paragraph>
        </StyledNoResultsMessage>
    );
};

export default NoResultsMessage;