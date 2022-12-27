import React, {useState} from 'react';
import styled, {css, useTheme} from "styled-components";
import CloseButton from "../atoms/CloseButton";
import Button from "../atoms/Button";
import FallbackSuspense from "../atoms/FallbackSuspense";
import PopUp from "./PopUp";
import enlargedPicture from "../../hoc/EnlargedPicture";

const ImageCropper = React.lazy(() => import("../organism/ImageCropper"));

interface IProps {
    media: string[];
    removeItem?: (index: number) => void;
    replaceItem?: (newImage: string, index: number) => void;
    editable?: boolean;
}

interface ImagesWrapperProps {
    biggerThanOneItem: boolean;
}

const SmallGrid = css`
  grid-auto-columns: minmax(0, 1fr);
  grid-auto-flow: column;
`

const BigGrid = css`
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(auto-fill, 40vh);
  
  @media screen and ${({theme}) => theme.media.mobileL} {
    grid-template-rows: repeat(auto-fill, 20vh);
  }
`

const ImagesWrapper = styled.div<ImagesWrapperProps>`
  margin: 10px 0;
  display: grid;
  gap: 10px;
  ${({biggerThanOneItem}) => {
    if (!biggerThanOneItem) return SmallGrid;
    else return BigGrid;
  }};

`

const TweetCreatorImage = styled.div`
  position: relative;
  display: inline-block;
  
  video {
    object-fit: cover;
    width: 100%;
  }
`

const TweetImage = styled.img`
  cursor: pointer;
  object-fit: cover;
  min-height: 150px;
  height: 100%;
  width: 100%;
  border-radius: 20px;
`

const EditButton = styled(Button)`
  position: absolute;
  right: 5px;
  bottom: 5px;
`

const EnlargedTweetImage = enlargedPicture(TweetImage)


const TweetCreatorMedia = ({media, removeItem, replaceItem, editable = false}: IProps) => {

    const [editingImage, setEditingState] = useState<{
        image: string,
        index: number
    } | undefined>();


    return (
        <ImagesWrapper biggerThanOneItem={media.length > 1}>
            {media.map((src, index) => <TweetCreatorImage key={index}>
                {editable &&
                    <CloseButton backgroundColor="#0F1419" color="white" position={{left: "5px", top: "5px"}}
                                 onClick={() => removeItem?.(index)}/>}
                {src.startsWith("data:video") || src.slice(src.lastIndexOf(".")) === ".mp4" || src.slice(src.lastIndexOf(".")) === ".m4v" ?
                    <video controls src={src}/> : <React.Fragment>
                        {editable ?  <TweetImage onClick={() => {
                            if (editable) setEditingState({
                                image: src,
                                index
                            })
                        }}  src={src} alt=""/> :  <EnlargedTweetImage src={src} alt=""/>}
                        {editable && <EditButton onClick={() => setEditingState({
                            image: src,
                            index
                        })} small type="dark">Edit</EditButton>}
                    </React.Fragment>}
            </TweetCreatorImage>)}
            {editingImage &&
                <PopUp withPadding={false} closePopUp={() => setEditingState(undefined)}><FallbackSuspense><ImageCropper
                    image={editingImage.image} callback={(newImage) => {
                    replaceItem?.(newImage, editingImage.index)
                    setEditingState(undefined);
                }}
                    stopEditing={() => setEditingState(undefined)}/></FallbackSuspense></PopUp>}
        </ImagesWrapper>
    );
};

export default TweetCreatorMedia;