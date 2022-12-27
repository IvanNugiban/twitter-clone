import React, {useEffect, useState} from 'react';
import Loader from "../atoms/Loader";
import {FormikProps, FormikValues} from "formik";
import Paragraph from "../atoms/Typography/Paragraph";
import Input from "../atoms/Input";
import Link from "../atoms/Link";
import Button from "../atoms/Button";
import styled from "styled-components";
import {useMutation} from "@apollo/client";
import {RESEND_VERIFICATION_CODE} from "../../graphql/mutations/registration";


interface IProps {
    data?: FormikProps<FormikValues>;
    isLoading: boolean;
}

const NextButton = styled(Button)`
  margin-top: 200px;
  
`


const CheckCodeAndRegister = ({data, isLoading}: IProps) => {

    const [timer, setTimer] = useState(30);
    const [resendVerificationCode, {loading}] = useMutation(RESEND_VERIFICATION_CODE);


    function setTimeout() {
        let timeout = 30;
        const interval = setInterval(() => {
            if (timeout === 0) {
                clearInterval(interval);
                return;
            }
            setTimer(timeout - 1);
            timeout -= 1;
        }, 1000)

        return interval;
    }

    useEffect(() => {
       const interval = setTimeout();

        return () => clearInterval(interval)
    }, [])


    if (!data) return <Loader/>

    return (
        <React.Fragment>
            <Paragraph>{`Enter the code below the field to confirm the email ${data.values.email}`}</Paragraph>
            <Input disabled={isLoading} autoFocus onChange={(e) => {
                const value = (e.target as HTMLInputElement).value;
                if (value === "") data.handleChange(e);
                else if (/\D/.test(value)) return;
                data.handleChange(e)
            }} value={data.values.code} maxLength={6} name="code" placeholder="Verification code"
                   ariaLabel="Verification code from mail"/>
            {timer === 0 ? <Link onClick={async () => {
                    await resendVerificationCode({
                        variables: {
                            Email: data.values.email
                        }
                    })
                    setTimer(30);

                    setTimeout();
                }
                }><Paragraph>Resend code</Paragraph></Link> :
                <Link active={false}><Paragraph>Resend code ({timer})</Paragraph></Link>}
            <NextButton buttonType="submit">Next</NextButton>

            {loading && <Loader/>}
        </React.Fragment>
    );
};

export default CheckCodeAndRegister;