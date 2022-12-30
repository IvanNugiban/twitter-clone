import React, {ChangeEvent, FocusEventHandler, useEffect, useState} from 'react';
import styled, {css} from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from '@fortawesome/fontawesome-svg-core/import.macro';

const Wrapper = styled.span`
  position: relative;

  input[type=file] {
    display: none;
  }
`

const EyeIcon = styled(FontAwesomeIcon)`
  position: absolute;
  top: 5px;
  right: 20px;
  cursor: pointer;
  user-select: none;

  &.hasPadding {
    top: -7px;
  }
`

const VisibleSubPlaceholder = css`
  visibility: visible;
  font-size: 0.8rem;
  top: -25px;
  color: ${({theme}) => theme.colors.main};

`

const SubPlaceholder = styled.div<SubPlaceholderProps>`
  pointer-events: none;
  color: #797575;
  position: absolute;
  top: 0;
  left: 20px;
  transition: 0.3s;
  transition-property: visibility, top, font-size;

  ${({visible}) => {
    if (visible) return VisibleSubPlaceholder;
  }}
`

const StyledInput = styled.input`
  min-height: 60px;
  width: 100%;
  background-color: ${({theme}) => theme.backgroundColor};
  color: ${({theme}) => theme.colors.black};
  border: 1px solid ${({theme}) => theme.colors.gray};
  border-radius: 5px;
  padding: 0 20px;

  &::-webkit-calendar-picker-indicator {
  color: white;
  }

  &::placeholder {
    color: transparent;
  }

  &.active,
  &.focusable:focus {
    padding-top: 25px;
  }


  &:focus {
    outline: 1px solid ${({theme}) => theme.colors.main};
  }

`

const MaxInputLength = styled.span`
  position: absolute;
  top: -30px;
  right: 10px;
  font-size: 0.9rem;
`


interface IProps {
    placeholder?: string;
    ariaLabel?: string;
    name?: string;
    disabled?: boolean;
    onChange?: (e: ChangeEvent & {
        target: HTMLInputElement
    }) => void;
    onBlur?: FocusEventHandler<HTMLInputElement>
    value?: string;
    type?: string;
    maxLength?: number;
    autoFocus?: boolean;
    accept?: string;
}

interface SubPlaceholderProps {
    visible: boolean
}


const Input = React.forwardRef<HTMLInputElement, IProps>((props, ref) => {

    const [isVisible, setVisibility] = useState(props.type !== "password")
    const [isPlaceholderShown, setPlaceholderState] = useState(false);
    const [isMaxLengthVisible, setMaxLengthVisibility] = useState(false);

    useEffect(() => {
        if (props.value !== "") setPlaceholderState(true)
    }, [])


    return (
        <Wrapper>
            <StyledInput ref={ref}
                         className={(props.value === "" && props.placeholder) ? "focusable" : (props.value !== "" && props.placeholder) ? "active" : "inactive"}
                         onClick={(e) => {
                             if (props.type === "file") (e.target as HTMLInputElement).value = '';
                         }}
                         onFocus={() => {
                             setPlaceholderState(true);
                             if (props.maxLength) setMaxLengthVisibility(true);
                         }} onBlur={() => {
                if (props.maxLength) setMaxLengthVisibility(false);
                if (props.value !== "") return;
                setPlaceholderState(false);
            }} {...props}  autoComplete="off"
                         type={props.type === "password" ? (isVisible ? "text" : "password") : props.type}/>
            {props.type === "password" && <EyeIcon className={isPlaceholderShown ? "hasPadding" : "noPadding"}
                                                   onClick={() => setVisibility((prevState) => !prevState)}
                                                   icon={isVisible ? solid("eye") : solid("eye-slash")}/>}

            {props.placeholder && <SubPlaceholder visible={isPlaceholderShown}>{props.placeholder}</SubPlaceholder>}
            {isMaxLengthVisible &&
                <MaxInputLength>{props.value?.length ? props.value.length : 0}/{props.maxLength}</MaxInputLength>}
        </Wrapper>
    );
});

export default Input;