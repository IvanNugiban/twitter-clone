import React from 'react';
import styled, {css} from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import H3Title from "./Typography/H3Title";
import {Link, useLocation} from "react-router-dom";

const ActiveNavbarItem = css`
  background-color: ${({theme}) => theme.colors.main_thin};
  color: ${({theme}) => theme.colors.main};

  &:hover {
    background-color: ${({theme}) => theme.colors.main_thin};
  }
`

const StyledNavbarItem = styled.div<NavbarItemProps>`
  display: inline-flex;
  align-items: center;
  gap: 0 10px;
  padding: 10px 15px;
  border-radius: 50px;
  transition: 0.2s all;
  cursor: pointer;

  &:hover {
    background-color: ${({theme}) => theme.colors.gray_thin};
  }

  ${({isChosen}) => {
    if (isChosen) return ActiveNavbarItem;
  }} @media screen and ${({theme}) => theme.media.laptopL} {
    padding: 12px;
    border-radius: 50%;
    h3 {
      display: none;
    }
  }
`

const NavbarItemIcon = styled(FontAwesomeIcon)`
  margin-right: 20px;
  font-size: 1.3rem;
  @media screen and ${({theme}) => theme.media.laptopL} {
    margin-right: 0;
  }

`

interface IProps {
    link?: string;
    icon: IconProp;
    children: React.ReactNode;
    onClick?: () => void;
}

interface NavbarItemProps {
    isChosen: boolean;
}

const NavbarItem = React.forwardRef<HTMLDivElement, IProps>(({link, icon, children, onClick}, ref) => {

    const {pathname} = useLocation();

    return (
        <li>
            {link ? <Link to={link}>
                <StyledNavbarItem ref={ref} isChosen={pathname === link}>
                    <NavbarItemIcon icon={icon}/>
                    <H3Title>{children}</H3Title>
                </StyledNavbarItem>
            </Link> : <StyledNavbarItem ref={ref} onClick={onClick} isChosen={false}>
                <NavbarItemIcon icon={icon}/>
                <H3Title>{children}</H3Title>
            </StyledNavbarItem>}
        </li>
    );
});

export default NavbarItem;