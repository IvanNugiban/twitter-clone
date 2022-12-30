import React, {useRef, useState} from 'react';
import AppLogo from "../atoms/AppLogo";
import {useNavigate} from "react-router-dom";
import NavbarItem from "../atoms/NavbarItem";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import styled from 'styled-components';
import Button from "../atoms/Button";
import NavbarUser from "../molecules/NavbarUser";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import UserStore from "../../store/UserStore";
import useWindowDimensions from "../../hooks/useWindowDemensions";
import H6Title from "../atoms/Typography/H6Title";
import useElementWidth from "../../hooks/useElementWidth";
import {observer} from "mobx-react-lite";
import PopUp from "../molecules/PopUp";
import FallbackSuspense from "../atoms/FallbackSuspense";
import Popover from "../molecules/Popover";
import Details from "../molecules/Details";
import TweetService from "../../services/tweetService";
import ProfileTweetsStore from "../../store/ProfileTweetsStore";
import {useMutation} from "@apollo/client";
import {CREATE_TWEET} from "../../graphql/mutations/tweets";
import Loader from "../atoms/Loader";
import Alert from "../atoms/Alert";

const TweetCreator = React.lazy(() => import("./TweetCreator"));
const DisplayChanger = React.lazy(() => import("./DisplayChanger"))

const Wrapper = styled.div<WrapperProps>`
  position: relative;
  max-width: ${({width}) => width ? `${width}px` : "255px"};
  width: 100%;
  margin-right: 10px;


  @media screen and ${({theme}) => theme.media.mobileL} {
    width: 0;
    margin-right: 0;
  }
`

const StyledNavbar = styled.aside`
  position: fixed;
  z-index: 1500;
  display: flex;
  flex-direction: column;
  padding-top: 15px;
  max-width: 255px;
  width: 100%;
  height: 100vh;
  background-color: ${({theme}) => theme.backgroundColor};


  ul {
    margin-top: 10px;
  }

  li:not(:last-of-type) {
    margin-bottom: 12px;
  }

  @media screen and ${({theme}) => theme.media.laptopL} {
    max-width: 88px;
  }


  @media screen and ${({theme}) => theme.media.mobileL} {
    bottom: 0;
    left: 0;
    flex-direction: row;
    height: auto;
    min-width: 100%;
    padding-top: 0;

    .navbarList {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: flex-end;
      padding: 10px 30px 0 30px;
      margin-top: 0;
      border-top: 1px solid ${({theme}) => theme.colors.gray_thin};
    }

    .logoWrapper {
      display: none;
    }

    li:nth-child(n + 5) {
      display: none;
    }
  }
`

const ContentWrapper = styled.div`
  overflow-y: auto;
  height: 100%;
  width: 100%;

  @media screen and ${({theme}) => theme.media.mobileL} {
    overflow: visible;
  }
`


const TweetButton = styled(Button)`
  padding: 14px 0;
  width: 80%;
  margin-top: 40px;
  box-shadow: -1px 1px 20px 0 rgba(0, 0, 0, 0.10);

  @media screen and ${({theme}) => theme.media.laptopL} {
    width: 60%;
    border-radius: 50%;
  }

  @media screen and ${({theme}) => theme.media.mobileL} {
    position: fixed;
    bottom: 90px;
    right: 20px;
    width: 56px;
    padding: 16px 0;
  }
`

const TweetPopUp = styled(PopUp)`
  @media screen and (min-width: 701px) {
    height: auto;
  }
  padding: 30px 20px 0 20px;
  max-height: 60vh;

  .tweetCreator {
    width: 100%;
  }
`

interface WrapperProps {
    width: number | undefined;
}


const Navbar = observer(() => {

    const navigate = useNavigate();
    const {width} = useWindowDimensions();
    const navbarRef = useRef<HTMLElement>(null);
    const navbarWidth = useElementWidth(navbarRef);
    const [isTweetCreatorActive, setTweetCreatorState] = useState(false);
    const [isMorePopoverActive, setMorePopoverState] = useState(false);
    const moreButtonRef = useRef<HTMLDivElement>(null);
    const [isDisplayChangerActive, setDisplayChangerState] = useState(false);
    const [createTweet, {loading, error}] = useMutation(CREATE_TWEET)


    return (
        <Wrapper width={navbarWidth}>
            <StyledNavbar ref={navbarRef}>
                  <span className="logoWrapper">
                 <AppLogo isClickable={() => {
                     navigate("/home")
                 }}/>
                </span>
                <ContentWrapper>
                    <ul className="navbarList">
                        <NavbarItem link="/home" icon={solid("house")}>Home</NavbarItem>
                        <NavbarItem link="/explore"
                                    icon={width > 1000 ? solid("hashtag") : solid("magnifying-glass")}>Explore</NavbarItem>
                        <NavbarItem link="/notifications" icon={solid("bell")}>Notifications</NavbarItem>
                        <NavbarItem link="/messages" icon={solid("envelope")}>Messages</NavbarItem>
                        <NavbarItem link="/bookmarks" icon={solid("bookmark")}>Bookmarks</NavbarItem>
                        <NavbarItem link={`/${UserStore.pseudonym}`} icon={solid("user")}>Profile</NavbarItem>
                        <NavbarItem ref={moreButtonRef} onClick={() => setMorePopoverState(true)}
                                    icon={solid("ellipsis")}>More</NavbarItem>
                    </ul>
                    <Popover width="300px" top={moreButtonRef.current?.getBoundingClientRect().top}
                             isActive={isMorePopoverActive}
                             closePopover={() => setMorePopoverState(false)}
                             body={<Details title={"Settings"} items={[{
                                 icon: solid("gear"),
                                 text: "Settings and privacy",
                                 callback: () => {
                                     navigate("/settings");
                                     setMorePopoverState(false);
                                 }
                             },
                                 {
                                     icon: solid("palette"),
                                     text: "Display",
                                     callback: () => {
                                         setMorePopoverState(false);
                                         setDisplayChangerState(true)
                                     }
                                 }]}/>}/>

                    <TweetButton onClick={() => setTweetCreatorState(true)}>{width <= 1300 ?
                        <FontAwesomeIcon icon={solid("feather")}/> : <H6Title>Tweet</H6Title>}</TweetButton>
                </ContentWrapper>
                {isTweetCreatorActive &&
                    <TweetPopUp width="500px"  withPadding={false}
                                closePopUp={() => setTweetCreatorState(false)}><FallbackSuspense><TweetCreator successText="Tweet created!"
                        callback={async (tweetText, media, gif) => {
                            const result = await TweetService.createTweet(createTweet, {text: tweetText.trim(), media, gif});
                            if (result) ProfileTweetsStore.reset();
                            return result;
                        }} buttonText="Tweet" inputPlaceholder="What's happening?"
                        onSuccessCallback={() => setTweetCreatorState(false)}/></FallbackSuspense></TweetPopUp>}
                <NavbarUser/>
            </StyledNavbar>
            {isDisplayChangerActive && <FallbackSuspense><DisplayChanger
                closeDisplayChanger={() => setDisplayChangerState(false)}/></FallbackSuspense>}
            {loading && <Loader/>}
            {error && <Alert text={error.message} interval={3000}/>}
        </Wrapper>
    );
});

export default Navbar;