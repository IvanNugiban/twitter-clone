import React, {useState} from 'react';
import styled from "styled-components";
import Avatar from "../atoms/Avatar";
import {observer} from "mobx-react-lite";
import UserStore from "../../store/UserStore";
import {useNavigate} from "react-router-dom";
import TextArea from "../atoms/TextArea";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {regular} from "@fortawesome/fontawesome-svg-core/import.macro";
import Button from "../atoms/Button";
import TextProgressionProgressbar from "../atoms/TextProgressionProgressbar";
import EmojiPicker from "../molecules/EmojiPicker";
import FallbackSuspense from "../atoms/FallbackSuspense";
import TweetCreatorGif from "../atoms/TweetCreatorGif";
import MediaPicker from "../molecules/MediaPicker";
import TweetCreatorMedia from "../molecules/TweetCreatorMedia";
import Alert from "../atoms/Alert";


const GifPicker = React.lazy(() => import("./GifPicker"))

const StyledTweetCreator = styled.div`
  display: flex;
  position: relative;
  padding-bottom: 10px;
  margin-top: 10px;
  margin-left: 5px;

  .tweetCreatorAvatar {
    min-width: 40px;
    min-height: 40px;
  }

  &:after {
    content: "";
    display: block;
    position: absolute;
    height: 1px;
    width: 100%;
    bottom: 0;
    border-bottom: 1px solid ${({theme}) => theme.colors.gray_thin};
  }
`

const TweetTextArea = styled(TextArea)`
  border-bottom: 1px solid ${({theme}) => theme.colors.gray_thin};
  max-height: 500px;
`

const TextAreaWrapper = styled.div`
  margin-left: 15px;
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  width: 100%;
`

const TweetCreatorMenu = styled.menu`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 5px;

  & > span {
    display: flex;
  }
`

export const MenuButton = styled.button`
  display: flex;
  justify-content: center;
  margin-right: 15px;
  border-radius: 50%;
  padding: 10px;
  transition: 0.5s all;
  opacity: 0.5;
  cursor: default;

  @media screen and ${({theme}) => theme.media.mobile} {
    margin-right: 0;
  }

  svg {
    color: ${({theme}) => theme.colors.main};
    font-size: 1.1rem;
  }

  &.active {
    cursor: pointer;
    opacity: 1;

    &:hover {
      background-color: ${({theme}) => theme.colors.main_thin};
      transition: 0.5s all;
    }
  }
`

const GifIcon = styled.span`
  color: ${({theme}) => theme.colors.main};
  border: 2px solid ${({theme}) => theme.colors.main};
  border-radius: 3px;
  font-size: 0.6rem;
  height: 100%;

`

const TweetButton = styled(Button)`
  justify-self: flex-start;
  margin-right: 10px;
`

const TweetTextCounter = styled(TextProgressionProgressbar)`
  padding-right: 10px;
  margin-right: 10px;
  border-right: 1px solid ${({theme}) => theme.colors.gray};
`


const tweetMaxLength = 280;

interface IProps {
    inputPlaceholder: string;
    buttonText: string;
    callback: (tweetText: string, media: string[], gif?: string) => Promise<boolean>;
    onSuccessCallback?: () => void;
    className?: string;
    successText: string;
}

const TweetCreator = observer(({onSuccessCallback, inputPlaceholder, buttonText, callback, className, successText}: IProps) => {

    const [isEmojiPickerActive, setEmojiPickerState] = useState(false);
    const [isGifPickerActive, setGifPickerState] = useState(false)
    const navigate = useNavigate();
    const [tweetText, setTweetText] = useState("")
    const [gif, setGif] = useState<string | undefined>();
    const [media, setMedia] = useState<string[]>([]);
    const [isTweetCreated, setTweetState] = useState(false);

    return (
        <StyledTweetCreator className={`${className} tweetCreator`}>
            <Avatar className="tweetCreatorAvatar" onClick={() => navigate(`/${UserStore.pseudonym}`)}
                    avatar={UserStore.avatar}/>
            <TextAreaWrapper>
                <TweetTextArea value={tweetText}
                               onChange={(e) => setTweetText(e.target.value)}
                               maxLength={tweetMaxLength} placeholder={inputPlaceholder}/>
                {gif && <TweetCreatorGif removeGif={() => setGif(undefined)} src={gif}/>}
                {media.length !== 0 && <TweetCreatorMedia editable
                                                          replaceItem={(newImage, index) => setMedia(prevState => {
                                                              prevState.splice(index, 1, newImage);
                                                              return prevState;
                                                          })}
                                                          removeItem={(index) => setMedia(prevState => prevState.filter((_, itemIndex) => index !== itemIndex))}
                                                          media={media}/>}
                <TweetCreatorMenu>
                    <span>
                        <MediaPicker media={media} setMedia={setMedia} gif={gif}/>
                        <MenuButton className={(gif || media.length >= 1) ? "inactive" : "active"}
                                    onClick={() => (gif || media.length >= 1) ? undefined : setGifPickerState(true)}><GifIcon>GIF</GifIcon></MenuButton>
                        <MenuButton className="active" onClick={() => setEmojiPickerState(true)}><FontAwesomeIcon
                            icon={regular("smile")}/></MenuButton>
                        {isEmojiPickerActive &&
                            <EmojiPicker closeEmojiPicker={() => setEmojiPickerState(false)} onEmojiClick={(emoji) => {
                                if (tweetText.length >= tweetMaxLength) return
                                setTweetText(prevState => prevState + emoji.emoji)
                            }}/>}
                        {isGifPickerActive && <FallbackSuspense><GifPicker onGifClick={(gif) => setGif(gif)}
                                                                           closeGifPicker={() => setGifPickerState(false)}/></FallbackSuspense>}
                    </span>
                    <span>
                        {tweetText.length > 0 &&
                            <TweetTextCounter textLength={tweetText.length} maxLength={tweetMaxLength}/>}
                        <TweetButton
                            onClick={async () => {
                                const result = await callback(tweetText, media, gif);
                                if (result) {
                                    setTweetText("");
                                    setGif(undefined);
                                    setMedia([]);
                                    onSuccessCallback?.();
                                    setTweetState(true);
                                    setTimeout(() => setTweetState(false), 3000);
                                }
                            }} small
                            disabled={tweetText.length === 0 && !gif && media.length === 0}>{buttonText}</TweetButton>
                    </span>
                </TweetCreatorMenu>
            </TextAreaWrapper>
            {isTweetCreated && <Alert text={successText} interval={3000}/>}
        </StyledTweetCreator>
    );
});

export default TweetCreator;