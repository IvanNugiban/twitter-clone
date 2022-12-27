import React from 'react';
import styled from "styled-components";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import H4Title from "./Typography/H4Title";


const StyledHamburgerMenuList = styled.ul`
  padding-bottom: 10px;
  border-bottom: 1px solid ${({theme}) => theme.colors.gray_thin};
  
  li {
    margin-top: 10px;
  }
`

const StyledListItem = styled.li`
  transition: 0.5s;
  padding: 10px;

  &:hover {
    background-color: ${({theme}) => theme.colors.gray_thin};
  }

  button {
    background: none;
  }
`

const ListItemWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  color: ${({theme}) => theme.colors.black};
`

interface IProps {
    pseudonym: string;
}


const HamburgerMenuList = ({pseudonym} : IProps) => {


    return (
        <StyledHamburgerMenuList>
            <Link to={`/${pseudonym}`}> <StyledListItem
               >
                <button>
                    <ListItemWrapper>
                        <FontAwesomeIcon icon={solid("user")}/>
                        <H4Title>Profile</H4Title>
                    </ListItemWrapper>
                </button>
            </StyledListItem>
            </Link>
            <Link to="/bookmarks">
                <StyledListItem >
                <button>
                    <ListItemWrapper>
                        <FontAwesomeIcon icon={solid("bookmark")}/>
                        <H4Title>Bookmarks</H4Title>
                    </ListItemWrapper>
                </button>
            </StyledListItem>
            </Link>
        </StyledHamburgerMenuList>
    );
};

export default HamburgerMenuList;