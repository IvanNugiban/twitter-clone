import React from 'react';
import styled, {css} from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";

const clickableAvatar = css`
  transition: 0.5s all;

  &:hover {
    transition: 0.5s all;
    cursor: pointer;
    filter: brightness(0.8);
  }
`

const StyledAvatar = styled.img`
  border-radius: 50%;
  background-color: ${({theme}) => theme.backgroundColor};
  width: 40px;
  height: 40px;

  object-fit: cover;

  &.clickable {
    ${clickableAvatar}
  }


`

interface IProps {
    avatar: string | undefined;
    className?: string;
    onClick?: (e :React.MouseEvent | React.KeyboardEvent) => void;
}


const UserIcon = styled(FontAwesomeIcon).attrs(() => ({
    color: "gray",
    icon: solid("circle-user")
}))`
  font-size: 2.2rem;
  background-color: ${({theme}) => theme.colors.white};
  border-radius: 50%;

  &.clickable {
    ${clickableAvatar}
  }
`

const Avatar = ({avatar, className, onClick}: IProps) => {
    return (
        <span onKeyDown={(e) => {
            if ((document.activeElement === e.target) && e.key === "Enter") {
                if (onClick) onClick(e);
            }
        }} tabIndex={0} className={className} onClick={onClick}>
           {avatar ? <StyledAvatar className={onClick ? "clickable" : "unclickable"} src={avatar}/> :
               <UserIcon className={`${className} ${onClick ? "clickable" : "unclickable"}`}/>}
        </span>
    );
};

export default Avatar;