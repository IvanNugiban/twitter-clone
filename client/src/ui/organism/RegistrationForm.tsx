import React, {useState} from 'react';
import styled from 'styled-components';
import H3Title from "../atoms/Typography/H3Title";
import SubTitle from "../atoms/Typography/SubTitle";
import MultiStepForms from "../molecules/MultiStepForms";
import RegistrationDataChecker from "../molecules/RegistrationDataChecker";
import {useMutation} from "@apollo/client";
import {CHECK_REGISTER_DATA, CHECK_VERIFICATION_CODE} from "../../graphql/mutations/registration";
import Alert from "../atoms/Alert";
import Loader from "../atoms/Loader";
import CheckCodeAndRegister from "../molecules/CheckCodeAndRegister";
import registrationService from "../../services/registrationService";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import DocumentTitle from "react-document-title";

const maxSteps = 2;

const Wrapper = styled.div`
  max-width: 800px;
  padding-top: 50px;

  input {
    margin-top: 30px;
  }

  h6 {
    margin-top: 20px;
  }
  
`

const BackButton = styled.button`
  position: absolute;
  left: 5px;
  top: 5px;
  cursor: pointer;
  padding: 8px 13px;
  border-radius: 50%;
  transition: 0.2s background-color;
  background-color: ${({theme}) => theme.colors.white};
  font-size: 1.1rem;
  z-index: 1300;
  
  &:hover,
  &:focus {
    background-color: ${({theme}) => theme.colors.gray_thin};
  }

  &:active {
    background-color: ${({theme}) => theme.colors.gray};
  }
  &:focus {
    outline: none;
  }
`

const StepCounter = styled(H3Title)`
  position: absolute;
  left: 60px;
  top: 14px;
  
`


const RegistrationForm = () => {

    const [step, setStep] = useState(1);
    const [checkRegisterData, {loading, error}] = useMutation(CHECK_REGISTER_DATA);
    const [checkVerificationCode, {loading: codeLoading, error: codeError}] = useMutation(CHECK_VERIFICATION_CODE);


    return (
        <Wrapper>
            <DocumentTitle title="Sign up on twitter"/>
            <StepCounter>Step {step} of {maxSteps}</StepCounter>
            <MultiStepForms initialValues={{
                username: "",
                pseudonym: "",
                email: "",
                birthday: "",
                password: "",
                code: ""
            }} childrenArray={[
                [
                    <SubTitle>Create an account</SubTitle>,
                    <RegistrationDataChecker isLoading={loading}/>
                ],
                [
                    <SubTitle>We sent you a code</SubTitle>,
                    <CheckCodeAndRegister isLoading={codeLoading}/>,
                    <BackButton onClick={() => setStep(prevState => prevState - 1)}>
                        <FontAwesomeIcon icon={solid('left-long')}/>
                    </BackButton>
                ]
            ]} step={step} onSubmit={async (values) => {
                try {
                    if (step === 1) {
                        await registrationService.checkRegisterData(checkRegisterData, values);
                        setStep(prevState => prevState + 1)
                    } else {
                        await registrationService.checkVerificationCode(checkVerificationCode, values);
                    }
                } catch {
                    return
                }
            }}/>

            {(error || codeError) && <Alert interval={5000} text={error ? error.message : codeError!.message}/>}
            {(loading || codeLoading) && <Loader/>}
        </Wrapper>
    );
};

export default RegistrationForm;