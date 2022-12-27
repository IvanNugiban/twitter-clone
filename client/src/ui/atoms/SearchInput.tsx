import React, {ChangeEvent} from 'react';
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";

const Wrapper = styled.div`
  position: relative;
`

const StyledSearchInput = styled.input`
  display: inline-block;
  width: 100%;
  padding: 0 40px;
  border-radius: 20px;
  background-color: ${({theme}) => theme.backgroundColor};
  min-height: 40px;
  color: ${({theme}) => theme.colors.black};
  border: 2px solid ${({theme}) => theme.colors.gray};

  &:focus {
    outline: 0;
    border: 2px solid ${({theme}) => theme.colors.main};
  }


  &:focus + svg {
    color: ${({theme}) => theme.colors.main};
  }
`

const SearchIcon = styled(FontAwesomeIcon).attrs(() => ({
    icon: solid("magnifying-glass")
}))`
  position: absolute;
  transform: translate(0, -50%);
  top: 50%;
  left: 15px;
  font-size: 0.9rem;
`

const ClearButton = styled(FontAwesomeIcon).attrs(() => ({
    icon: solid("circle-xmark")
}))`
  position: absolute;
  cursor: pointer;
  color: ${({theme}) => theme.colors.main};
  transform: translate(0, -50%);
  top: 50%;
  right: 15px;
  font-size: 1.1rem;
`

interface IProps {
    value: string;
    onChange: (e: ChangeEvent & {
        target: HTMLInputElement
    }) => void;
    name?: string;
    placeholder?: string;
    setValue: (value: string) => void;
    onFocus?: () => void;
    onKeyUp?: (e: React.KeyboardEvent) => void;
}

const SearchInput = React.forwardRef<HTMLInputElement, IProps>(({setValue, ...props}, ref) => {

    return (
        <Wrapper>
            <StyledSearchInput ref={ref} {...props}/>
            <SearchIcon/>
            {props.value.length > 0 && <ClearButton onClick={() => setValue("")}/>}
        </Wrapper>
    );
});

export default SearchInput;