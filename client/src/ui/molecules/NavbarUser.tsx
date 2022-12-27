import React, {useRef, useState} from 'react';
import {observer} from "mobx-react-lite";
import UserStore from "../../store/UserStore";
import styled from "styled-components";
import Avatar from "../atoms/Avatar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import Paragraph from "../atoms/Typography/Paragraph";
import UserInfoPopover from "../atoms/UserInfoPopover";


const Wrapper = styled.div`
  position: relative;
  padding: 20px 0;
  width: 100%;
  display: flex;
  align-items: flex-end;

  @media screen and ${({theme}) => theme.media.laptopL} {
    width: 47px;
  }

  @media screen and ${({theme}) => theme.media.mobileL} {
    display: none;
  }
`

const StyledNavbarUser = styled.button`
  width: 100%;
  position: relative;
  background-color: transparent;
  justify-self: flex-end;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  border-radius: 60px;
  padding: 10px;

  .ellipsis {
   color: ${({theme}) => theme.colors.black}
  }
  
  &:hover,
  &:focus {
    background-color: ${({theme}) => theme.colors.gray_thin};
  }

  @media screen and ${({theme}) => theme.media.laptopL} {
    padding: 3px;
    .ellipsis {
      display: none;
    }
  }

  @media screen and ${({theme}) => theme.media.mobileL} {
    display: none;
  }

`

const StyledUserInformation = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  color: ${({theme}) => theme.colors.black};

  span {
    margin-left: 11px;

    p:last-of-type {
      color: #6E767D;
    }
  }

  @media screen and ${({theme}) => theme.media.laptopL} {
    span:first-child {
      margin-left: 0;
    }

    .removable {
      display: none;
    }
  }
`


export const UserInformation = observer(({className}: { className?: string }) => {

    return (
        <StyledUserInformation>
            <div style={{display: "flex", alignItems: "center"}}>
                <Avatar avatar={UserStore.avatar}/>
                <span className={className}>
            <Paragraph>{UserStore.username}</Paragraph>
            <Paragraph>@{UserStore.pseudonym}</Paragraph>
                     </span>
            </div>
        </StyledUserInformation>
    )
})

const NavbarUser = () => {

    const [isPopoverActive, setPopoverState] = useState(false);

    const navbarUserRef = useRef(null);

    return (
        <Wrapper>
            <div ref={navbarUserRef} onClick={() => setPopoverState(true)}
                 style={{position: "relative", width: "100%"}}>
                <StyledNavbarUser onClick={() => setPopoverState(true)}>
                    <UserInformation className="removable"/>
                    <FontAwesomeIcon className="ellipsis" fontSize="1.3rem" icon={solid("ellipsis")}/>
                </StyledNavbarUser>
                <UserInfoPopover parentElementRef={navbarUserRef} pseudonym={UserStore.pseudonym}
                                 isActive={isPopoverActive}
                                 closePopover={() => setPopoverState(false)}/>
            </div>
        </Wrapper>
    );
}

export default NavbarUser;