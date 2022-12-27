import React, {useState} from 'react';
import styled from "styled-components";
import Avatar from "../atoms/Avatar";
import {observer} from "mobx-react-lite";
import UserStore from "../../store/UserStore";
import Paragraph from "../atoms/Typography/Paragraph";
import {useLocation} from "react-router-dom";
import BackButton from "../atoms/BackButton";
import FallbackSuspense from "../atoms/FallbackSuspense";


const HamburgerMenu = React.lazy(() => import("../organism/HamburgerMenu"));


const StyledPageHeader = styled.header`
  position: sticky;
  padding: 0 15px;
  top: 0;
  left: 0;
  z-index: 1100;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  min-height: 53px;
  background-color: rgba(0.85);
  backdrop-filter: blur(12px);


  
  .hamburgerMenuOpener {
    display: none;
  }


  @media screen and ${({theme}) => theme.media.mobileL} {
    .hamburgerMenuOpener {
      display: block;
      margin-right: 10px;
      min-width: 40px;
      min-height: 40px;
      max-width: 40px;
      max-height: 40px;
    }
  }
`

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  .backButton {
    margin-right: 10px;
  }
`

const OptionsWrapper = styled.div`
  position: relative;

  button {
    cursor: pointer;
  }
`

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

interface IProps {
    content: React.ReactNode;
    subTitle?: string;
    options?: React.ReactNode
}

const PageHeader = observer(({content, subTitle, options}: IProps) => {

    const [isMenuOpened, setMenuState] = useState(false);
    const {pathname} = useLocation();


    return (
        <React.Fragment>
            <StyledPageHeader>
                <HeaderWrapper>
                    {(pathname === "/home" || pathname === "/explore") ?
                        <Avatar  onClick={() => setMenuState(true)} className="hamburgerMenuOpener"
                                avatar={UserStore.avatar}/> : <BackButton className="backButton"/>}
                    <ContentWrapper>
                    {content}
                        <Paragraph fontSize="0.8rem">{subTitle}</Paragraph>
                  </ContentWrapper>
                </HeaderWrapper>
                <OptionsWrapper>
                    {options}
                </OptionsWrapper>
            </StyledPageHeader>
            {isMenuOpened && <FallbackSuspense>
                <HamburgerMenu closeMenu={() => setMenuState(false)} isOpened={isMenuOpened}/>
            </FallbackSuspense>}
        </React.Fragment>
    );
});

export default PageHeader;
