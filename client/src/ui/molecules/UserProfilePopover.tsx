import React, {RefObject} from 'react';
import Popover from './Popover';
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import Paragraph from "../atoms/Typography/Paragraph";
import NotAllowedButton from "../atoms/NotAllowedButton";

interface IProps {
    isActive: boolean;
    closePopover: () => void;
    pseudonym: string;
    parentRef: RefObject<HTMLElement>
}


const PopoverItem = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  cursor: pointer;

  p {
    color: ${({theme}) => theme.colors.black};
  }

  &.notAllowed {
    cursor: not-allowed;
  }

  &:hover {
    background-color: ${({theme}) => theme.colors.gray_thin};
  }
`

const UserProfilePopover = ({isActive, closePopover, pseudonym, parentRef}: IProps) => {


    return (
        <Popover width="300px" left={-150} isActive={isActive} closePopover={closePopover} parentRef={parentRef}
                 body={<ul>
                     <PopoverItem>
                         <FontAwesomeIcon fontSize="1.3rem" icon={solid("link")}/>
                         <button onClick={() => {
                             navigator.clipboard.writeText(window.location.href)
                             closePopover();
                         }
                         } style={{cursor: "pointer"}}><Paragraph>Copy link to profile</Paragraph></button>
                     </PopoverItem>
                     <PopoverItem className="notAllowed">
                         <FontAwesomeIcon fontSize="1.3rem" icon={solid("ban")}/>
                         <NotAllowedButton><Paragraph>Block @{pseudonym} (in dev)</Paragraph></NotAllowedButton>
                     </PopoverItem>
                     <PopoverItem className="notAllowed">
                         <FontAwesomeIcon fontSize="1.3rem" icon={solid("flag")}/>
                         <NotAllowedButton><Paragraph>Report @{pseudonym} (in dev)</Paragraph></NotAllowedButton>
                     </PopoverItem>
                 </ul>}/>
    );
};

export default UserProfilePopover;