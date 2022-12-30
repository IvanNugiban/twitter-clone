import React from 'react';
import {FormikProps, FormikValues} from "formik";
import Loader from "./Loader";
import Input from "./Input";

interface IProps {
    data?: FormikProps<FormikValues>;
    isLoading: boolean;
}

const NewPassword = ({data, isLoading}: IProps) => {

    if (!data) return <Loader/>;

    return (
        <React.Fragment>
            <Input maxLength={25} type="password" disabled={isLoading} autoFocus name="newPassword" onChange={data.handleChange}
                   value={data.values.newPassword}
                   placeholder="Enter a new password"/>
            <Input maxLength={25}  type="password" disabled={isLoading} name="passwordConfirmation" onChange={data.handleChange}
                   value={data.values.passwordConfirmation}
                   placeholder="Confirm new password"/>
        </React.Fragment>
    );
};

export default NewPassword;