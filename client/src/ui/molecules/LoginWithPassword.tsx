import React from 'react';
import Input from "../atoms/Input";
import {FormikProps, FormikValues} from "formik";
import Paragraph from "../atoms/Typography/Paragraph";
import Button from "../atoms/Button";
import styled from "styled-components";
import Link from "../atoms/Link";
import Loader from "../atoms/Loader";
import {useNavigate} from "react-router-dom";

interface IProps {
    data?: FormikProps<FormikValues>;
    isLoading: boolean;
}

const LogInButton = styled(Button)`
   margin-top: 150px !important;
`

const LoginWithPassword = ({data, isLoading}: IProps) => {

    const navigate = useNavigate();

    if (!data) return <Loader/>

    return (
        <React.Fragment>
            <Input  value={data.values.emailOrUsername} onChange={data.handleChange} disabled name="emailOrUsername" placeholder="Email or username" ariaLabel="Entered email or username"/>
            <Input  disabled={isLoading} autoFocus type="password" value={data.values.password} onChange={data.handleChange} ariaLabel="Password" name="password" placeholder="Password"/>
            <Paragraph><Link onClick={() => navigate("/password_reset")}>Forgot password?</Link></Paragraph>
            <LogInButton buttonType="submit">Log in</LogInButton>
        </React.Fragment>
    );
};

export default LoginWithPassword;