import React from 'react';
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import {FormikProps, FormikValues} from "formik";
import Loader from "../atoms/Loader";
import {useNavigate} from "react-router-dom";




interface IProps {
    data?: FormikProps<FormikValues>;
    isLoading: boolean;
}

const LoginDataChecker = ({data, isLoading}: IProps) => {

    const navigate = useNavigate();

    if (!data) return <Loader/>;

    return (
        <React.Fragment>
            <Input   disabled={isLoading} autoFocus onChange={data.handleChange}
                   value={data.values.emailOrUsername} ariaLabel="Email or pseudonym" name="emailOrUsername"
                   placeholder="Email or pseudonym"/>
            <Button  ariaLabel="Login" buttonType="submit">Login</Button>
            <Button onClick={() => navigate("/password_reset")} ariaLabel="Reset password" type="secondary">Forgot password?</Button>
        </React.Fragment>
    )
};

export default LoginDataChecker;