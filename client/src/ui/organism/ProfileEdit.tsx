import React, {useEffect, useRef} from 'react';
import H3Title from "../atoms/Typography/H3Title";
import styled from "styled-components";
import ProfileImage from "../atoms/ProfileImage";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import CloseButton from "../atoms/CloseButton";
import ProfileAvatar from "../atoms/ProfileAvatar";
import ProfileEditForm from "../molecules/ProfileEditForm";
import {observer} from "mobx-react-lite";
import UserStore from "../../store/UserStore";
import userStore from "../../store/UserStore";
import ProfileStore from "../../store/ProfileStore";
import FallbackSuspense from "../atoms/FallbackSuspense";

const ImageCropper = React.lazy(() => import("./ImageCropper"))

const StyledProfileEdit = styled.div`
  h3 {
    text-align: center;
    padding: 15px;
  }

`

const ProfileEditImage = styled.div`
  position: relative;
  margin-top: 15px;
  min-width: 600px;

  @media screen and ${({theme}) => theme.media.tablet} {
    min-width: initial;
    width: 100vw;
  }

`

const CameraButton = styled.button`
  position: absolute;
  left: 40%;
  top: 50%;
  padding: 15px 19px;
  z-index: 1100;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: 0.5s;
  transform: translate(-50%, -50%);
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.4);
    transition: 0.5s;
  }

  @media screen and ${({theme}) => theme.media.mobile} {
    left: 30%;
  }
`

const BackgroundRemover = styled(CloseButton)`
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.5);
  padding: 17px 21px 12px 21px;

  &:hover,
  &:focus {
    background-color: rgba(0, 0, 0, 0.4);
  }


`

const ProfileEditContent = styled.div`
  padding: 0 20px;

`

const AvatarWrapper = styled.div`
  position: relative;
  display: inline-block;

  svg {
    transform: translate(0, 0);
  }
`

const CameraButtonForAvatar = styled(CameraButton)`
  top: 0;
  left: 50%;
`

interface IProps {
    closeEditWindow: () => void;
}


const ProfileEdit = observer(({closeEditWindow}: IProps) => {

    const profileBackgroundInputRef = useRef<HTMLInputElement | null>(null)
    const avatarInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        return () => {
            ProfileStore.reset();
        }
    }, [])

    if (ProfileStore.isAvatarEditing) return <FallbackSuspense><ImageCropper
        image={ProfileStore.avatar as string} callback={newImage => ProfileStore.setCroppedAvatar(newImage)}
        stopEditing={() => ProfileStore.stopAvatarEditing()}/></FallbackSuspense>
    else if(ProfileStore.isProfileBackgroundEditing) return <FallbackSuspense><ImageCropper
        image={ProfileStore.profileBackground as string} callback={newImage => ProfileStore.setCroppedProfileBackground(newImage)}
        stopEditing={() => ProfileStore.stopProfileBackgroundEditing()}/></FallbackSuspense>


    return (
        <StyledProfileEdit>
            <H3Title>Edit profile</H3Title>
            <ProfileEditImage>
                <ProfileImage image={ProfileStore.croppedProfileBackground || UserStore.profileBackground}/>
                <CameraButton onClick={() => profileBackgroundInputRef.current?.click()}>
                    <FontAwesomeIcon color="white" icon={solid("camera")}/>
                </CameraButton>
                <BackgroundRemover position={{
                    left: "60%",
                    top: "50%"
                }} color="white" onClick={() => undefined}/>
            </ProfileEditImage>
            <ProfileEditContent>
                <AvatarWrapper>
                    <ProfileAvatar position="relative" className="editableAvatar"
                                   avatar={ProfileStore.croppedAvatar || UserStore.avatar}/>
                    <CameraButtonForAvatar onClick={() => avatarInputRef.current?.click()}>
                        <FontAwesomeIcon color="white" icon={solid("camera")}/>
                    </CameraButtonForAvatar>
                </AvatarWrapper>
                <ProfileEditForm closeEditWindow={closeEditWindow} avatarRef={avatarInputRef}
                                 backgroundRef={profileBackgroundInputRef} user={userStore}/>
            </ProfileEditContent>
        </StyledProfileEdit>
    )
        ;
});

export default ProfileEdit;