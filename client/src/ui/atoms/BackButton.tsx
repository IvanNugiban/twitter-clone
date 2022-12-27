import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";

const StyledBackButton = styled.button`
  display: inline-block;
  background-color: transparent;
  transition: 0.5s;
  border-radius: 50% ;
  padding: 10px 15px;
  cursor: pointer;
  color: ${({theme}) => theme.colors.black};
  
  &:hover {
    background-color: ${({theme}) => theme.colors.gray_thin};
  }
 
`

interface IProps {
    className?: string;
    onClick?: () => void;
}

const BackButton = ({className, onClick} : IProps) => {

    const navigate = useNavigate();

    return (
        <StyledBackButton className={className} onClick={onClick ? onClick : () => navigate(-1) }>
           <FontAwesomeIcon icon={solid("arrow-left")}/>
       </StyledBackButton>
    );
};

export default BackButton;