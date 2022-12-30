import React, {ChangeEvent, useCallback, useState} from 'react';
import Input from "../atoms/Input";
import styled from "styled-components";
import H6Title from "../atoms/Typography/H6Title";
import Paragraph from "../atoms/Typography/Paragraph";
import {useFormik} from "formik";
import {IUser} from "../../types/interfaces/IUser";
import Button from "../atoms/Button";
import {useMutation} from "@apollo/client";
import {SAVE_CHANGES} from "../../graphql/mutations/profile";
import Alert from "../atoms/Alert";
import Loader from "../atoms/Loader";
import ProfileStore from "../../store/ProfileStore";
import {IUserProfile} from "../../types/interfaces/IUserProfile";
import UserStore from "../../store/UserStore";

interface IProps {
    user: IUser;
    avatarRef: React.RefObject<HTMLInputElement>;
    backgroundRef: React.RefObject<HTMLInputElement>;
    closeEditWindow: () => void;
}

const StyledProfileEditForm = styled.form`
  max-width: 950px;
  margin-top: -40px;

  input {
    margin-bottom: 30px;
  }

  p {
    margin: 10px 0;
  }

`

const SaveButton = styled(Button)`
  position: absolute;
  right: 10px;
  top: 13px;
`


const ProfileEditForm = ({user, avatarRef, backgroundRef, closeEditWindow}: IProps) => {


    const [saveChanges, {loading, error}] = useMutation(SAVE_CHANGES, {
        onCompleted: (data) => {
            UserStore.updateProfile(data.saveChanges);
            closeEditWindow();
        }
    });


    const [isFileLoading, setFileLoadingState] = useState(false);
    const [fileExtensionError, setFileExtensionError] = useState<boolean>(false);


    const formik = useFormik({
        initialValues: {
            username: user.username,
            description: user.description || "",
            website: user.website || "",
            birthday: user.birthday
        },
        onSubmit: async (values) => {
            await saveChanges({
                variables: {
                    Profile: {
                        username: values.username.trim(),
                        description: values.description.trim(),
                        website: values.website.trim(),
                        birthday: values.birthday,
                        avatar: ProfileStore.croppedAvatar,
                        profileBackground: ProfileStore.croppedProfileBackground
                    }
                }
            }) as { data: { saveChanges: IUserProfile } }
        }
    });

    const handleFIleUpdate = useCallback((event: ChangeEvent, fileName: "avatar" | "profileBackground") => {
        const files = (event.target as HTMLInputElement).files;

        if (!files || files.length === 0) return

        const file = files[0];
        const idxDot = file.name.lastIndexOf(".") + 1;
        const extFile = file.name.substring(idxDot).toLowerCase();

        if (extFile == "jpg" || extFile == "jpeg" || extFile == "png") {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            setFileLoadingState(true);

            reader.onload = () => {
                if (fileName === "avatar") ProfileStore.setAvatar(reader.result as string);
                else ProfileStore.setProfileBackground(reader.result as string);
                setFileLoadingState(false);
            }
            return;
        }

        setFileExtensionError(true);
        setTimeout(() => setFileExtensionError(false), 3000);
    }, [])


    return (
        <StyledProfileEditForm onSubmit={formik.handleSubmit}>

            <SaveButton small buttonType="submit" className="saveButton">Save</SaveButton>
            <Input disabled={loading} maxLength={16} placeholder="Username" name="username"
                   value={formik.values.username}
                   onChange={formik.handleChange}/>
            <Input disabled={loading} maxLength={160} placeholder="Description" name="description"
                   value={formik.values.description}
                   onChange={formik.handleChange}/>
            <Input disabled={loading} maxLength={100} placeholder="Website" name="website" value={formik.values.website}
                   onChange={formik.handleChange}/>

            <H6Title>Birthday</H6Title>
            <Paragraph>This information will not be publicly available. Verify your age, even if this account is
                for a company, pet, etc.</Paragraph>

            <Input disabled={loading} type="date" name="birthday" value={formik.values.birthday}
                   onChange={formik.handleChange}/>

            <Input disabled={loading} accept=".png, .jpg, .jpeg" name="avatar" ref={avatarRef}
                   onChange={(e) => handleFIleUpdate(e, "avatar")}
                   type="file"/>
            <Input disabled={loading} accept=".png, .jpg, .jpeg" name="profileBackground"
                   onChange={(e) => handleFIleUpdate(e, "profileBackground")}
                   ref={backgroundRef} type="file"/>

            {error && <Alert text={error.message} interval={3000}/>}
            {fileExtensionError && <Alert text="Only jpg/jpeg and png files are allowed!" interval={3000}/>}
            {(loading || isFileLoading) && <Loader/>}
        </StyledProfileEditForm>
    );
};

export default ProfileEditForm;