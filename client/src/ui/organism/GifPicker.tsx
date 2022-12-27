import React, {useEffect, useRef, useState} from 'react';
import PopUp from "../molecules/PopUp";
import styled from "styled-components";
import SearchInput from "../atoms/SearchInput";
import useDelayedRequest from "../../hooks/useDelayedRequest";
import {IGiphyResponse} from "../../types/interfaces/IGiphyResponse";
import Loader from "../atoms/Loader";
import Alert from "../atoms/Alert";
import GifService from "../../services/gifService";
import useInfinityScroll from "../../hooks/useInfinityScroll";
import TransparentElement from "../atoms/TransparentElement";
import CenteredLoader from "../atoms/CenteredLoader";
import NoGifs from "../atoms/NoGifs";


interface IProps {
    closeGifPicker: () => void;
    onGifClick: (gif: string) => void;
}

const GifPickerHeader = styled.header`
  position: relative;
  left: 10px;
  top: 10px;
  
  input {
    width: 300px;
  }

  @media screen and ${({theme}) => theme.media.mobile} {
    left: 20px;
    input {
      width: 250px;
    }
  }
`

const GIFsWrapper = styled.div`
  overflow: auto;
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 5px;

  img {
    cursor: pointer;
    width: 200px;
    height: 200px;
    object-fit: cover;
  }

  @media screen and ${({theme}) => theme.media.laptop} {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and ${({theme}) => theme.media.mobileL} {
    grid-template-columns: repeat(2, 1fr);

    img {
      width: 250px;
      height: 290px;
    }
  }

  @media screen and ${({theme}) => theme.media.mobileL} {
    img {
      width: 200px;
      height: 200px;
    }
  }
`


const initialLimit = 15


const GifPicker = ({closeGifPicker, onGifClick}: IProps) => {

    const [gifSearchText, setGifSearchText] = useState("");
    const [gifs, setGifs] = useState<IGiphyResponse[]>([]);
    const [error, setError] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const lastGifRef = useRef<HTMLDivElement>(null);
    const [limit, setLimit] = useState(initialLimit);
    const previousGifSearchText = useRef(gifSearchText);


    useEffect(() => {
        const reqLimit = previousGifSearchText.current !== gifSearchText ? initialLimit : limit;
        if (gifSearchText === "") {
            if (reqLimit === initialLimit) setIsFetching(true);
            GifService.getRandomGifs(setGifs, setError, limit, () => setIsFetching(false));
        }
    }, [gifSearchText, limit])


    useDelayedRequest([gifSearchText, limit], () => {
        if (gifSearchText === "") {
            return previousGifSearchText.current = gifSearchText;
        }
        let reqLimit = limit;
        if (previousGifSearchText.current !== gifSearchText) {
            reqLimit = initialLimit;
            setLimit(reqLimit);
        }
        previousGifSearchText.current = gifSearchText;
        if (reqLimit === initialLimit) setIsFetching(true);
        GifService.getGifs(gifSearchText, setGifs, setError, reqLimit, () => setIsFetching(false));
    })

    useInfinityScroll(limit === gifs.length, limit, initialLimit, () => {
        setLimit(prevState => prevState + initialLimit)
    }, isFetching, lastGifRef.current, [gifs, limit])

    if (error) return <Alert text="An unknown has occurred. Try again later" interval={5000}/>
    if ((gifSearchText === "" && gifs.length === 0) || !gifs) return <Loader/>


    return (
        <PopUp minWidth="500px" withPadding={false} closePopUp={closeGifPicker}>
            <GifPickerHeader>
                <SearchInput setValue={(value) => setGifSearchText(value)} value={gifSearchText}
                             placeholder="Search for GIFs"
                             onChange={(e) => setGifSearchText(e.target.value)} name="gif"/>
            </GifPickerHeader>
            {gifs.length === 0 ? <NoGifs/> : <GIFsWrapper>
                {isFetching ? <CenteredLoader/> : gifs.map((gif, index) => <img onClick={() => {
                    onGifClick(gif.images.fixed_height.url);
                    closeGifPicker();
                }
                } alt="Gif" key={index}
                                                                                src={gif.images.fixed_height.url}/>)}
                <TransparentElement ref={lastGifRef}/>
            </GIFsWrapper>}

        </PopUp>
    );
};

export default GifPicker;