import React from 'react';
import styled from 'styled-components';
import {Link, useLocation} from "react-router-dom";
import H6Title from "../atoms/Typography/H6Title";

const UserProfileNavbarList = styled.ul<NavbarListProps>`
  display: grid;
  align-items: center;
  grid-auto-columns: minmax(0, 1fr);
  grid-auto-flow: column;
  overflow-x: auto;
  white-space: nowrap;
  z-index: 1500;
  

  
  ${({gridColumns}) => {
      if (gridColumns) return `
      grid-template-columns: ${gridColumns};
      `
  }}
  
  &::-webkit-scrollbar {
    width: 6px;
    height: 3px;
  }

  /* Track */

  &::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 5px;
  }

  /* Handle */

  &::-webkit-scrollbar-thumb {
    background: ${({theme}) => theme.colors.gray};
    border-radius: 5px;
  }

  border-bottom: 1px solid ${({theme}) => theme.colors.gray};
  
  @media screen and ${({theme}) => theme.media.mobileL} {
    grid-auto-columns: minmax(130px, 1fr);
    grid-template-columns: initial;
  }
`

const NavbarItem = styled.li<NavbarItemProps>`;
  display: flex;
  justify-content: center;
  transition: 0.5s;
  max-height: 53px;
  text-align: center;
  height: 100%;

  h6 {
    padding: 15px 0;
    display: inline-block;
    min-height: 100%;
    font-weight: ${({isActive}) => isActive ? "700" : "400"};
    border-bottom: 3px solid ${({isActive, theme}) => isActive ? theme.colors.main : "none"};
    color: ${({isActive, theme}) => isActive ? theme.colors.black : "#5D6D79"};
  }
  &:hover {
    transition: 0.5s;
    background-color: ${({theme}) => theme.colors.gray_thin};
  }
`

interface NavbarListProps {
    gridColumns?: string;
}

interface NavbarItemProps {
    isActive: boolean;
}

interface IProps {
    items: {
        text: string,
        pathname: string
        isActive?: boolean;
    }[]
    gridColumns?: string;
    className?:string;
}


const ProfileNavbar = ({items, gridColumns, className}: IProps) => {

    const {pathname} = useLocation();

    return (
        <nav className={className}>
            <UserProfileNavbarList gridColumns={gridColumns}>
                {items.map((item) => <Link key={item.pathname} to={item.pathname}>
                    <NavbarItem isActive={item.isActive? true : pathname === item.pathname}>
                        <H6Title >{item.text}</H6Title>
                    </NavbarItem>
                </Link>)}
            </UserProfileNavbarList>
        </nav>
    );
};

export default ProfileNavbar;