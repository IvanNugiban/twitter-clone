import React, {ImgHTMLAttributes, RefObject} from "react";
import styled, {StyledComponent} from "styled-components";
import CloseButton from "../ui/atoms/CloseButton";


const ImageWrapper = styled.div`
  height: 100%;
  .clickableImage {
    cursor: pointer;
    transition: 0.3s all;

    &:hover {
      filter: brightness(85%);
      transition: 0.3s all;
    }
  }
`

const StyledEnlargedPicture = styled.div`
  position: fixed;
  background-color: #183949;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 1700;
  display: flex;
  justify-content: center;
  align-items: center;
  
  .enlargedPicture {
    max-width: 30vw;
    max-height: 50vh;
    
    @media screen and ${({theme}) => theme.media.mobileL} {
      max-width: 50vw;
      max-height: 60vh;
    }
    
    transform: scale(2);
    object-fit: contain;
    user-select: none;
    svg {
      transform: translate(-50%, -50%) ;
    }
  }
`


const EnlargedPicture = (Image: React.ElementType | StyledComponent<any, any>) => {

    return class extends React.Component<any, { isImageOpened: boolean }> {
        enlargedPictureRef: RefObject<HTMLDivElement>

        constructor(props: any) {
            super(props);
            this.state = {
                isImageOpened: false
            }
            this.enlargedPictureRef = React.createRef()
        }


        imageClick = () => {
            this.setState({
                isImageOpened: true
            })
        }

        render() {

            return <ImageWrapper>
                <Image   {...this.props} onClick={this.imageClick} className={`clickableImage ${this.props.className}`}/>
                {this.state.isImageOpened &&
                    <StyledEnlargedPicture ref={this.enlargedPictureRef} onClick={(e) => {
                        if (e.target !== this.enlargedPictureRef.current) return;
                        this.setState({isImageOpened: false})
                    }}>
                        <Image {...this.props} className="enlargedPicture" />
                        <CloseButton position={{
                            left: "20px",
                            top: "20px"
                        }} color="white" onClick={() => this.setState({isImageOpened: false})}/>
                    </StyledEnlargedPicture>}
            </ImageWrapper>;
        }
    }

}

export default EnlargedPicture;