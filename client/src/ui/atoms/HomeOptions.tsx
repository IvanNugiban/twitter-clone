import React from 'react';
import {observer} from "mobx-react-lite";
import clockImage from "../../assets/clock.png";
import starsImage from "../../assets/stars.png"
import H3Title from "./Typography/H3Title";
import TweetsStore from "../../store/TweetsStore";
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import Paragraph from "./Typography/Paragraph";
import H6Title from "./Typography/H6Title";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  text-align: center;
  img {
    width: 50px;
    height: 50px;
  }
`

const SortSwitcher = styled.button`
  display: flex;
  width: 100%;
  text-align: initial;
  align-self: flex-start;
  align-items: center;
  gap: 10px;
  padding: 15px;
  border-top: 2px solid ${({theme}) => theme.colors.gray_thin};
  color: ${({theme}) => theme.colors.black};
  
  &:hover {
    background-color: ${({theme}) => theme.colors.gray_thin};
  }
`

interface IProps {
    closeOptions: (sortType: "top" | "latest") => void;
}

const HomeOptions = observer(({closeOptions} : IProps) => {

    const isLatestSort = TweetsStore.tweetSortType === "latest";

    return (
        <Wrapper>
            <img src={isLatestSort ? clockImage : starsImage}/>
            <H3Title>{isLatestSort ? "Latest Tweets show up as they happen" : "Home shows you top Tweets first"}</H3Title>
            <SortSwitcher onClick={() => {
                const newSortType = isLatestSort ? "top" : "latest";
                TweetsStore.setTypeOfTweetSorting(newSortType);
                closeOptions(newSortType);
            }}>
                <FontAwesomeIcon icon={solid("arrow-right-arrow-left")}/>
                <span>
                    <H6Title>{isLatestSort ? "Go back Home" : "See latest Tweets instead"}</H6Title>
                    <Paragraph fontSize="0.9rem">{isLatestSort ? "You’ll see top Tweets first." : "You’ll see latest tweets."}</Paragraph>
                </span>
            </SortSwitcher>
        </Wrapper>
    );
});

export default HomeOptions;