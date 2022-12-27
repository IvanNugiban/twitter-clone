import React from 'react';
import styled from "styled-components";
import Avatar from "./Avatar";
import EnlargedPicture from "../../hoc/EnlargedPicture";


const StyledProfileAvatar = styled(Avatar)<ProfileAvatarProps>`
  position: ${({position}) => position};
  border-radius: 50%;
  z-index: 2;
  display: inline-block;
  transform: translate(0, -50%);

  svg {
    border: 3px solid ${({theme}) => theme.colors.white};
    padding: 2px;
    font-size: 7vw;
    @media screen and (max-width: 1500px) {
      font-size: 9vw;
    }

    @media screen and ${({theme}) => theme.media.laptop} {
      font-size: 15vw;
    }

    @media screen and ${({theme}) => theme.media.tablet} {
      font-size: 21vw;
    }

    @media screen and ${({theme}) => theme.media.mobileL} {
      font-size: 24vw;
    }

    @media screen and ${({theme}) => theme.media.mobile} {
      font-size: 29vw;
    }
    
    @media screen and (min-width: 1900px) {
      font-size: 9rem;
    }
  }


  img {
    border: 3px solid ${({theme}) => theme.colors.white};
    width: 150px;
    min-height: 150px;
    max-height: 150px;

    @media screen and ${({theme}) => theme.media.tablet} {
      width: 130px;
      min-height: 130px;
      max-height: 130px;
    }

    @media screen and ${({theme}) => theme.media.mobileL} {
      width: 110px;
      min-height: 110px;
      max-height: 110px;
    }
  }
`

const EnlargedProfileAvatar = EnlargedPicture(StyledProfileAvatar)

interface IProps {
    avatar: string | undefined;
    enlarged?: boolean;
    className?: string;
    position?: "relative" | "absolute";
}

interface ProfileAvatarProps {
    position: string;
}

const ProfileAvatar = ({avatar, enlarged = false, className, position = "absolute"}: IProps) => {
    return <React.Fragment>
        {enlarged ? <EnlargedProfileAvatar position={position} className={className} avatar={avatar}/> :
            <StyledProfileAvatar position={position} className={className} avatar={avatar}/>}
    </React.Fragment>

};

export default ProfileAvatar;