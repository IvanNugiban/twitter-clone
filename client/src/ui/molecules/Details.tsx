import React from 'react';
import styled from "styled-components";
import H6Title from "../atoms/Typography/H6Title";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

const StyledDetails = styled.details`
  cursor: pointer;
  .detailsOpener {
    transition: transform 0.2s ease-out;
  }

  &[open] {
    summary {
      .detailsOpener {
        color: ${({theme}) => theme.colors.main};
        transition: transform 0.2s ease-out;
        transform: rotate(-180deg);
      }
    }
  }

`

const Summary = styled.summary`
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  list-style: none;
  transition: 0.5s;


  &:hover {
    background-color: ${({theme}) => theme.colors.gray_thin};
  }

  &::-webkit-details-marker {
    display: none;
  }

`

const DetailsItem = styled.li`
  padding: 12px;
  display: flex;
  gap: 10px;
  align-items: center;
  transition: 0.5s;

  &:hover {
    background-color: ${({theme}) => theme.colors.gray_thin};
  }
`

interface IProps {
    title: string;
    items: {
        icon: IconProp;
        text: string;
        callback: () => void;
    }[]
}

const Details = ({title, items}: IProps) => {


    
    return (
        <StyledDetails>
            <Summary>
                <H6Title>{title}</H6Title>
                <FontAwesomeIcon className="detailsOpener" fontSize="1.2rem" icon={solid("chevron-down")}/>
            </Summary>
            <ul>
                {items.map((value) => <DetailsItem tabIndex={0} onKeyDown={(e) => {
                    if ((document.activeElement === e.target) && e.key === "Enter") {
                        value.callback();
                    }}} key={value.text} onClick={value.callback}>
                    <FontAwesomeIcon icon={value.icon}/>
                    <H6Title>{value.text}</H6Title>
                </DetailsItem>)}
            </ul>
        </StyledDetails>
    );
};


export default Details;