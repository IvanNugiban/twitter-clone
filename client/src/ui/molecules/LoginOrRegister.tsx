import React, {Suspense, useState} from 'react';
import styled from "styled-components";
import Button from "../atoms/Button";
import Paragraph from "../atoms/Typography/Paragraph";
import PopUp from "./PopUp";
import Loader from "../atoms/Loader";
import Link from '../atoms/Link';
import FallbackSuspense from "../atoms/FallbackSuspense";


const LoginForm = React.lazy(() => import("../organism/LoginForm"))
const RegistrationForm = React.lazy(() => import("../organism/RegistrationForm"));

const LoginOrRegisterComponent = styled.div`
  max-width: 300px;
  text-align: left;

  p {
    margin-top: 10px;
  }
`

const ButtonsSeparator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
  gap: 10px;
  word-break: normal;


  &:after,
  :before {
    content: "";
    display: inline-block;
    width: 100%;
    border: 1px solid ${({theme}) => theme.colors.gray_thin};
  }
`


const LoginOrRegister = () => {

    const [isLoginActive, setLoginState] = useState<boolean>(false);
    const [isRegistrationActive, setRegistrationState] = useState(false);

    return (
        <LoginOrRegisterComponent>
            <Button ariaLabel="Sign up" onClick={() => setRegistrationState(true)} type="secondary">Sign up</Button>
            <ButtonsSeparator>or</ButtonsSeparator>
            <Button ariaLabel="Login" onClick={() => setLoginState(true)} type="primary">Login</Button>
            <Paragraph fontSize="0.8rem">
                This is just a copy of Twitter, the author does not in any way claim the brand and its property. This
                site has been created for educational purposes only. To visit original twitter,
                click <Link  href="https://twitter.com">this link</Link>.
                Continue only if you understand this. Made by Ivan Peshikov in 2022 in Ukraine.
            </Paragraph>
            {isLoginActive && <FallbackSuspense ><PopUp closePopUp={() => setLoginState(false)}>
                <LoginForm openRegistrationPopUp={() => {
                    setLoginState(false);
                    setRegistrationState(true);
                }
                }/>
            </PopUp>
            </FallbackSuspense>}
            {isRegistrationActive && <FallbackSuspense><PopUp closePopUp={() => setRegistrationState(false)}>
                <RegistrationForm/>
            </PopUp>
            </FallbackSuspense>}
        </LoginOrRegisterComponent>
    );
};

export default LoginOrRegister;