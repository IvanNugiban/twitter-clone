import React, {useRef, useState} from 'react';
import styled from "styled-components";
import DocumentTitle from "react-document-title";
import PopUp from "../ui/molecules/PopUp";
import {useNavigate} from "react-router-dom";
import MultiStepForms from "../ui/molecules/MultiStepForms";
import SubTitle from "../ui/atoms/Typography/SubTitle";
import Paragraph from "../ui/atoms/Typography/Paragraph";
import AppLogo from "../ui/atoms/AppLogo";
import FindAccount from "../ui/atoms/FindAccount";
import Button from "../ui/atoms/Button";
import {useMutation} from "@apollo/client";
import {CHECK_LOGIN_DATA, CHECK_PASSWORD_RESET_CODE, RESET_PASSWORD} from "../graphql/mutations/login";
import Alert from "../ui/atoms/Alert";
import Loader from "../ui/atoms/Loader";
import PasswordResetCode from "../ui/atoms/PasswordResetCode";
import {RESEND_VERIFICATION_CODE} from "../graphql/mutations/registration";
import NewPassword from "../ui/atoms/NewPassword";

const StyledPasswordResetPage = styled.div`
  background-color: ${({theme}) => theme.colors.gray};
  width: 100vw;
  height: 100vh;

  p {
    margin: 10px 0 20px 0;
  }

  input {
    margin-bottom: 20px;
  }
`


const ButtonsWrapper = styled.div`
  position: absolute;
  bottom: 30px;
  width: calc(100% - 400px);
  display: flex;
  justify-content: flex-end;
  flex-direction: column;

  @media screen and ${({theme}) => theme.media.tablet} {
    width: calc(100% - 60px);
  }
`

const CancelButton = styled(Button)`
  height: 50px;
  margin-top: 20px;
`

const NextButton = styled(Button).attrs(() => ({
    buttonType: "submit"
}))`
  height: 50px;
`


const PasswordResetPage = () => {

    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [checkUserData, {loading, error}] = useMutation(CHECK_LOGIN_DATA);
    const [checkPasswordResetCode, {loading: codeLoading, error: codeError}] = useMutation(CHECK_PASSWORD_RESET_CODE);
    const [resetPassword, {loading: resetPasswordLoading, error: resetPasswordError}] = useMutation(RESET_PASSWORD);
    const [newPasswordMessage, setNewPasswordMessage] = useState<string | undefined>(undefined);
    const userEmail = useRef<string>("");
    const [sendVerificationCode] = useMutation(RESEND_VERIFICATION_CODE);


    return (
        <StyledPasswordResetPage>
            <DocumentTitle title="Password reset / Twitter"/>
            <PopUp closePopUp={() => navigate("/")}>
                <AppLogo/>
                <MultiStepForms initialValues={{
                    emailOrPseudonym: "",
                    code: "",
                    newPassword: "",
                    passwordConfirmation: ""
                }} childrenArray={[
                    [<SubTitle>Find your Twitter account</SubTitle>,
                        <Paragraph>To change your password, enter the email address or pseudonym associated with your
                            account.</Paragraph>,
                        <FindAccount isLoading={loading}/>,
                        <ButtonsWrapper><NextButton>Next</NextButton></ButtonsWrapper>
                    ], [
                        <SubTitle>We sent you a code</SubTitle>,
                        <Paragraph>Check if you received a confirmation code in your email. If you need to request a new
                            code, return to the previous screen and enter the details again.</Paragraph>,
                        <PasswordResetCode isLoading={codeLoading}/>,
                        <ButtonsWrapper>
                            <NextButton>Next</NextButton>
                            <CancelButton onClick={() => setStep((step) => step - 1)}
                                          type="secondary">Back</CancelButton>
                        </ButtonsWrapper>],
                    [
                        <SubTitle>Set a new password</SubTitle>,
                        <Paragraph>The password must contain at least 8 characters. To create a strong password, include
                            numbers, letters, and punctuation marks.</Paragraph>,
                        <Paragraph>Once you change your password, all your active Twitter sessions will be
                            terminated.</Paragraph>,
                        <NewPassword isLoading={false}/>,
                        <ButtonsWrapper>
                            <NextButton>Change password</NextButton>
                        </ButtonsWrapper>

                    ]
                ]} step={step} onSubmit={async (values) => {
                    try {
                        if (step === 1) {
                            const response = await checkUserData({variables: {user: values.emailOrPseudonym}});
                            sendVerificationCode({variables: {Email: response.data.checkLoginData}});
                            userEmail.current = response.data.checkLoginData;
                            userEmail.current = response.data.checkLoginData;
                            setStep(2);
                        } else if (step === 2) {
                            await checkPasswordResetCode({
                                variables: {
                                    Verification: {
                                        userEmail: userEmail.current,
                                        code: Number(values.code)
                                    }
                                }
                            })
                            setStep(3);
                        } else {
                            if (values.newPassword !== values.passwordConfirmation) {
                                setNewPasswordMessage("Passwords do not match.");
                                return setTimeout(() => setNewPasswordMessage(undefined), 5000)
                            }
                            await resetPassword({
                                variables: {
                                    NewPasswordData: {
                                        userEmail: userEmail.current,
                                        password: values.newPassword
                                    }
                                }
                            })
                            setNewPasswordMessage("Password successfully changed");
                            setTimeout(() => navigate("/"), 2000)
                        }

                    } catch {
                        return;
                    }
                }}/>
            </PopUp>
            {error && <Alert text={error.message} interval={5000}/>}
            {codeError && <Alert text={codeError.message} interval={5000}/>}
            {newPasswordMessage && <Alert text={newPasswordMessage} interval={5000}/>}
            {resetPasswordError && <Alert text={resetPasswordError.message} interval={5000}/>}
            {(loading || codeLoading || resetPasswordLoading) && <Loader/>}
        </StyledPasswordResetPage>
    );
};

export default PasswordResetPage;