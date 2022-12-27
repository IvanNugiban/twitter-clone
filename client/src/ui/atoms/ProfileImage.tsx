import React from 'react';
import EnlargedPicture from "../../hoc/EnlargedPicture";
import styled from "styled-components";


const StyledProfileImage = styled.img`
  width: 100%;
  min-height: 200px;
  max-height: 200px;
  object-fit: cover;
`

const GrayRectangle = styled(StyledProfileImage).attrs(() => ({
    as: "div"
}))`
  height: 200px;
  background-color: ${({theme}) => theme.colors.gray};
`

interface IProps {
    image?: string;
    className?: string;
    enlarged?: boolean;
}

const EnlargedGrayRectangle = EnlargedPicture(GrayRectangle)
const EnlargedProfileImage = EnlargedPicture(StyledProfileImage)

const ProfileImage = ({image, className, enlarged = false} : IProps) => {

    let Image;

    if (image && enlarged) Image = <EnlargedProfileImage className={className}  src={image}/>;
    else if (!image && enlarged) Image = <EnlargedGrayRectangle className={className} />;
    else if (image) Image = <StyledProfileImage className={className} src={image}/>;
    else Image = <GrayRectangle className={className} />;

    return (
        <React.Fragment>
            {Image}
        </React.Fragment>
    );
};

export default ProfileImage;