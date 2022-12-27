import React from 'react';
import styled from "styled-components";
import SubTitle from "./Typography/SubTitle";

const NoGifsMessage = styled.div`
  height: 100%;
  text-align: center;
  align-items: center;
  display: flex;
  gap: 5px;
  flex-direction: column;
  justify-content: center;
  padding: 0 30px;
`

const NoGifs = () => {
    return (
        <NoGifsMessage>
            <SubTitle>Nothing found</SubTitle>
            <p>Sorry, but nothing matched your search terms. Please try again with some different keywords</p>
        </NoGifsMessage>
    );
};

export default NoGifs;