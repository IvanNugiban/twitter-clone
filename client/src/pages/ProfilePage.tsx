import React, {useState} from 'react';
import {observer} from "mobx-react-lite";
import ProfileInfo from "../ui/organism/ProfileInfo";
import UserStore from "../store/UserStore";
import Button from "../ui/atoms/Button";
import styled from "styled-components";
import PopUp from "../ui/molecules/PopUp";
import FallbackSuspense from "../ui/atoms/FallbackSuspense";

const ProfileEdit = React.lazy(() => import("../ui/organism/ProfileEdit"))

const EditProfileButton = styled(Button)`
    min-width: 110px;
`

const ProfilePage = observer(() => {

    const [isEditPopUpOpened, setPopUpState] = useState(false);

    return (
        <React.Fragment>
            <ProfileInfo additionalFunctional={<EditProfileButton small onClick={() => setPopUpState(true)} type="secondary">Edit profile</EditProfileButton>} user={UserStore}/>
            {isEditPopUpOpened && <PopUp withPadding={false} closePopUp={() => setPopUpState(false)} children={<FallbackSuspense><ProfileEdit closeEditWindow={() => setPopUpState(false)} /></FallbackSuspense>}/>}
            </React.Fragment>
    );
});

export default ProfilePage;