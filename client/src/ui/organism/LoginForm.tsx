import React, {useState} from 'react';
import AppLogo from "../atoms/AppLogo";
import styled from "styled-components";
import MultiStepForms from "../molecules/MultiStepForms";
import LoginDataChecker from "../molecules/LoginDataChecker";
import SubTitle from "../atoms/Typography/SubTitle";
import {useMutation} from "@apollo/client";
import {CHECK_LOGIN_DATA, LOGIN} from "../../graphql/mutations/login";
import LoginWithPassword from "../molecules/LoginWithPassword";
import Alert from "../atoms/Alert";
import Loader from "../atoms/Loader";
import loginService from "../../services/loginService";
import {useNavigate} from "react-router-dom";
import DocumentTitle from "react-document-title";
import Paragraph from "../atoms/Typography/Paragraph";
import Link from "../atoms/Link";


interface IProps {
    openRegistrationPopUp: () => void;
}

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  input:last-of-type {
    margin-top: 30px;
  }

  button:first-of-type {
    margin-top: 30px;
  }

  button:last-of-type {
    margin: 30px 0;
  }
`

const LoginSubTitle = styled(SubTitle)`
  margin: 20px 0 40px 0;
`


const LoginForm = ({openRegistrationPopUp}: IProps) => {

    const [step, setStep] = useState(1)

    const [checkLoginData, {loading, error}] = useMutation(CHECK_LOGIN_DATA);
    const [login, {loading: loginLoading, error: loginError}] = useMutation(LOGIN);
    const navigate = useNavigate();


    return (
        <Wrapper>
            <DocumentTitle title="Login to twitter"/>
            <AppLogo/>
            <MultiStepForms
                step={step}
                childrenArray={[
                    [<LoginSubTitle>Login to twitter</LoginSubTitle>,
                        <LoginDataChecker isLoading={loading}/>,
                        <Paragraph>
                            Don't have an account? <Link onClick={openRegistrationPopUp}
                                                         >Register</Link></Paragraph>],
                    [<LoginSubTitle>Enter password</LoginSubTitle>,
                        <LoginWithPassword isLoading={loginLoading}/>,
                        <Paragraph>
                            Don't have an account? <Link onClick={openRegistrationPopUp}
                                                         >Register</Link></Paragraph>
                    ]
                ]} initialValues={{
                emailOrUsername: "",
                password: ""
            }}

                onSubmit={async (values) => {
                    try {
                        if (step === 1) {
                            await loginService.checkLoginData(checkLoginData, values);
                            return setStep(prevState => prevState + 1)
                        } else {
                            await loginService.login(login, values);
                            navigate("/home", {replace: true});
                        }
                    } catch {
                        return
                    }
                }}/>
            {(error || loginError) && <Alert interval={5000} text={error ? error.message : loginError!.message}/>}
            {(loading || loginLoading) && <Loader/>}
        </Wrapper>
    );
};

export default LoginForm;