import React from 'react';
import styled from "styled-components";

interface IProps {
    text: string;
}

const HighlightedText = styled.div`
  mark {
    cursor: pointer;
    background-color: transparent;
    color: ${({theme}) => theme.colors.main};

    &:hover {
      text-decoration: underline;
    }
  }
`

const TweetText = ({text}: IProps) => {

    const highlightedText = text.replace(/@.[a-zA-Z\d]+\b/, (user) => `<mark><a href="/${user.slice(1)}">${user}</a></mark>`)
        .replace(/(#+[a-zA-Z0-9(_)]{1,})/gi, (hashtag) => `<mark><a href="/search?q=${hashtag}">${hashtag}</a></mark>`);

    return (
        <HighlightedText dangerouslySetInnerHTML={{__html: highlightedText}}/>
    );
};

export default TweetText;