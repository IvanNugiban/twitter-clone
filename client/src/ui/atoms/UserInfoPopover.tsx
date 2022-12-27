import React, {RefObject} from 'react';
import styled from "styled-components";
import {UserInformation} from "../molecules/NavbarUser";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import Popover from "../molecules/Popover";
import Paragraph from "./Typography/Paragraph";
import {useMutation} from "@apollo/client";
import {LOGOUT} from "../../graphql/mutations/login";
import UserStore from "../../store/UserStore";
import Loader from "./Loader";
import NotAllowedButton from "./NotAllowedButton";



const StyledUserInfoPopover = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:first-child {
    padding: 10px;
  }
  
  @media screen and ${({theme}) => theme.media.laptopL} {
    span {
      margin-left: 11px;
    }
  }
  
`

const UserInfoButton = styled.button`
  width: 100%;
  text-align: left;
  cursor: pointer;
  padding: 10px;
  background-color: ${({theme}) => theme.backgroundColor};
  color: ${({theme}) => theme.colors.black};
  transition: 0.5s all;

  &:hover {
    background-color: ${({theme}) => theme.colors.gray_thin};
  }
  
  &.notAllowed {
    cursor: not-allowed;
  }
`



interface IProps {
    isActive: boolean;
    closePopover: () => void;
    pseudonym: string;
    parentElementRef: RefObject<HTMLElement>
}

const UserInfoPopover = ({isActive, closePopover, pseudonym, parentElementRef} :IProps) => {


    const [logout, {loading, client}] = useMutation(LOGOUT);


    return (
        <>
            <Popover parentRef={parentElementRef}  width="300px" title={(
                <StyledUserInfoPopover>
                    <UserInformation/>
                    <FontAwesomeIcon fontSize="1.3rem" color="green" icon={solid("check")}/>
                </StyledUserInfoPopover>
            )} body={
                (<div>
                    <UserInfoButton className="notAllowed"><Paragraph>Add an existing account (in dev)</Paragraph></UserInfoButton>
                    <UserInfoButton onClick={async () => {
                        try {
                            await logout();
                            await client.clearStore();
                            UserStore.logout();
                        } catch {
                            return;
                        }
                    }}><Paragraph>Log out @{pseudonym}</Paragraph></UserInfoButton>
                </div>)
            } closePopover={() => closePopover()} isActive={isActive}/>
            {loading && <Loader/>}
        </>
    );
};

export default UserInfoPopover;