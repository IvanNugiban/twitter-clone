import React, {useRef} from 'react';
import styled from "styled-components";
import {default as InstalledEmojiPicker, EmojiClickData, Theme} from "emoji-picker-react";
import useOutsideClickDetector from "../../hooks/useOutsideClickDetector";
import {observer} from "mobx-react-lite";
import ThemeStore from "../../store/ThemeStore";
import {whiteTheme} from "../../theme/theme";

const EmojiPickerWrapper = styled.div`
  position: absolute;
  z-index: 500;
`

interface IProps {
    closeEmojiPicker: () => void;
    onEmojiClick: (emoji: EmojiClickData) => void;
}

const EmojiPicker = observer(({closeEmojiPicker, onEmojiClick}: IProps) => {

    const emojiPickerRef = useRef(null);

    useOutsideClickDetector(emojiPickerRef, closeEmojiPicker);

    return (
        <EmojiPickerWrapper ref={emojiPickerRef}>
            <InstalledEmojiPicker theme={ThemeStore.theme.backgroundColor === "white" ? Theme.LIGHT : Theme.DARK} onEmojiClick={onEmojiClick}/>
        </EmojiPickerWrapper>
    );
});

export default EmojiPicker;