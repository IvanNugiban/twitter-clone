import React, {ChangeEvent, useEffect, useRef} from 'react';
import styled from 'styled-components';

const StyledTextArea = styled.textarea`
  width: 100%;
  color: ${({theme}) => theme.colors.black};
  font-size: 1.1rem;
  height: 100%;
  background-color: ${({theme}) => theme.backgroundColor};

  &::placeholder {
    font-size: 1.1rem;
  }
`

interface IProps {
    placeholder?: string;
    value: string;
    ref?: React.MutableRefObject<HTMLTextAreaElement | null>;
    onChange: (e: ChangeEvent & {
        target: {
            value: string;
        }
    }) => void;
    className?: string;
    maxLength?: number;
}

const TextArea = (props: IProps) => {

    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    useEffect(() => {
        if (!textareaRef.current) return;
        textareaRef.current.style.cssText = `height: ${textareaRef.current.scrollHeight}px; overflow-y: hidden`
    }, [])


    return (
        <StyledTextArea ref={element => {
            textareaRef.current = element;
            if (props.ref) props.ref.current = element;
        }} onInput={() => {
            if (!textareaRef.current) return;
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
        }} {...props}/>
    );
};

export default TextArea;