import React, {useRef, useState} from 'react';
import styled from "styled-components";
import SearchInput from "../atoms/SearchInput";
import WhoToFollow from "../molecules/WhoToFollow";
import TrendingNow from "../molecules/TrendingNow";
import SearchPopover from "../molecules/SearchPopover";
import HorizontalLoader from "../atoms/HorizontalLoader";
import {useLocation} from "react-router-dom";


const Wrapper = styled.div`
  position: relative;
  min-width: 350px;
  padding: 15px;
  margin-left: 10px;
  @media screen and ${({theme}) => theme.media.laptop} {
    display: none;
  }
`


const StyledSearchSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 97%;
  max-width: 350px;
  position: fixed;
`

const ItemsWrapper = styled.div`
  overflow: auto;
  height: 100%;
  
  &::-webkit-scrollbar {
    width: 10px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 5px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 5px;
  }
  
`

const EnlargedSearchInput = styled(SearchInput)`
  width: 100%;
  height: 42px;
`

const SearchSection = () => {

    const [searchText, setSearchText] = useState("");
    const {pathname} = useLocation();
    const [isPopoverActive, setPopoverActivity] = useState(false);
    const searchInputRef = useRef(null);

    return (
        <Wrapper>
            <StyledSearchSection>
                {pathname !== "/explore" &&
                    <EnlargedSearchInput onFocus={() => setPopoverActivity(true)} ref={searchInputRef}
                                         placeholder="Search Twitter" value={searchText}
                                         onChange={(e) => setSearchText(e.target.value)} setValue={setSearchText}/>}
                <SearchPopover text={searchText} inputRef={searchInputRef} active={isPopoverActive}
                               closePopover={(e) => {
                                   if (e?.target === searchInputRef.current) return;
                                   setPopoverActivity(false)
                               }}/>
                <ItemsWrapper>
                    <WhoToFollow/>
                    {pathname !== "/explore" && <TrendingNow/>}
                </ItemsWrapper>
            </StyledSearchSection>
        </Wrapper>
    );
};

export default SearchSection;