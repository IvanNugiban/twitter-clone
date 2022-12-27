import React, {useCallback, useRef, useState} from 'react';
import Cropper from "react-easy-crop";
import styled from "styled-components";
import H4Title from "../atoms/Typography/H4Title";
import Button from "../atoms/Button";
import ZoomSlider from "../atoms/ZoomSlider";
import cropperService from "../../services/cropperService";
import BackButton from "../atoms/BackButton";


const Wrapper = styled.div`
  width: 500px;
  height: 100%;
  position: relative;
  margin-bottom: 50px;
  margin-top: 30px;

  @media screen and (min-height: 901px) {
    height: 500px;
  }

  @media screen and ${({theme}) => theme.media.tablet} {
    width: 100vw;
    height: 100vh;
  }

  .reactEasyCrop_CropArea {
    width: 100%;
    height: 100%;
    color: ${({theme}) => theme.colors.gray_thin};
    border: 3px solid ${({theme}) => theme.colors.main};
  }
`

const CropperHeader = styled.header`
  position: absolute;
  background-color: ${({theme}) => theme.backgroundColor};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 10px;
  z-index: 1300;
  width: 100%;
`

interface CroppedAreaPixels {
    x: number;
    y: number;
    width: number;
    height: number;
}

interface IProps {
    image: string;
    callback: (newImage: string) => void;
    stopEditing: () => void;
}

const ImageCropper = ({image, callback, stopEditing}: IProps) => {
    const [crop, setCrop] = useState({x: 0, y: 0})
    const [zoom, setZoom] = useState(1);
    const croppedAreaPixelsRef = useRef<CroppedAreaPixels | null>(null);

    const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: CroppedAreaPixels) => {
        croppedAreaPixelsRef.current = croppedAreaPixels;
    }, [])


    return (
        <React.Fragment>
            <CropperHeader>
                <BackButton onClick={stopEditing}/>
                <H4Title>Edit Media</H4Title>
                <Button small
                        onClick={async () => {
                            const croppedImage = await cropperService.getCroppedImg(image, croppedAreaPixelsRef.current, 180) as string
                            callback(croppedImage);
                        }}>Apply</Button>
            </CropperHeader>
            <Wrapper>
                <div className="crop-container">
                    <Cropper
                        image={image}
                        crop={crop}
                        zoom={zoom}
                        aspect={4 / 3}
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                    />
                </div>
            </Wrapper>
            <div>
                <ZoomSlider zoom={zoom} setZoom={setZoom}/>
            </div>
        </React.Fragment>
    )
};

export default ImageCropper;