import React from 'react';
import Input from "../atoms/Input";
import H6Title from "../atoms/Typography/H6Title";
import Paragraph from "../atoms/Typography/Paragraph";
import styled from "styled-components";
import Button from "../atoms/Button";
import {FormikProps, FormikValues} from "formik";
import Loader from "../atoms/Loader";

const NextButton = styled(Button)`
margin-top: 100px
`


interface IProps {
    data?: FormikProps<FormikValues>;
    isLoading: boolean;
}

const RegistrationDataChecker = ({data, isLoading} : IProps) => {

    if (!data) return <Loader/>

    return (
        <React.Fragment>
            <Input maxLength={16} disabled={isLoading} autoFocus value={data.values.username} onChange={data.handleChange} name="username" placeholder="Username" ariaLabel="Your username"/>
            <Input maxLength={16} disabled={isLoading} value={data.values.pseudonym} onChange={data.handleChange} name="pseudonym" placeholder="Pseudonym" ariaLabel="Your pseudonym"/>
            <Input maxLength={100} disabled={isLoading} value={data.values.email} onChange={data.handleChange} name="email" placeholder="Email" ariaLabel="Your email"/>
            <Input type="password" maxLength={25} disabled={isLoading} value={data.values.password} onChange={data.handleChange} name="password" placeholder="Password" ariaLabel="Your password"/>
            <H6Title>Birthday</H6Title>
            <Paragraph>This information will not be publicly available. Verify your age, even if this account is
                for a company, pet, etc.</Paragraph>
            <Input disabled={isLoading} value={data.values.birthday} onChange={data.handleChange} name="birthday" type="date" ariaLabel="Your birthday"/>
            <NextButton buttonType="submit">Next</NextButton>
        </React.Fragment>
    );
};

export default RegistrationDataChecker;