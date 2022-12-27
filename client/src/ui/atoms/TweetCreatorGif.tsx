import React from 'react';
import styled, {useTheme} from "styled-components";
import CloseButton from "./CloseButton";
import GiphyIcon from "../../assets/GiphyIcon.png"

interface IProps {
    src: string;
    removeGif: () => void;
}

const Wrapper = styled.div`
  position: relative;
  margin-top: 10px;
  
  p {
    display: flex;
    align-items: center;
    margin: 5px 0;

    img {
      height: 15px;
      width: 15px;
      margin: 0 2px 0 5px;
    }
  }
`

const GifBlock = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  border-radius: 5px;
  padding: 3px 5px;
  text-transform: uppercase;
  color: ${({theme}) => theme.colors.white};
  background-color: #0F1419;
`

const StyledGif = styled.img`
  border-radius: 20px;
  cursor: pointer;
  width: 100%;
  max-height: 400px;
  object-fit: cover;
`

const TweetCreatorGif = ({src, removeGif}: IProps) => {

    return (
        <Wrapper>
            <div style={{position: "relative"}}>
                <StyledGif alt="" src={src}/>
                <CloseButton  backgroundColor="#0F1419" color="white" position={{left: "5px", top: "5px"}} onClick={removeGif}/>
                <GifBlock>Gif</GifBlock>
            </div>
            <p>via <img src={GiphyIcon}/> GIPHY</p>
        </Wrapper>
    );
};

export default TweetCreatorGif;