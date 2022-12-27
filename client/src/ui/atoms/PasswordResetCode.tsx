import React from 'react';
import {FormikProps, FormikValues} from "formik";
import Loader from "./Loader";
import Input from "./Input";

interface IProps {
    data?: FormikProps<FormikValues>;
    isLoading: boolean;
}

const PasswordResetCode = ({data, isLoading}: IProps) => {

    if (!data) return <Loader/>;

    return (
        <React.Fragment>
            <Input autoFocus disabled={isLoading} name="code" maxLength={6} onChange={(e) => {
                const value = (e.target as HTMLInputElement).value;
                if (value === "") data.handleChange(e);
                else if (/\D/.test(value)) return;
                data.handleChange(e)
            }} value={data.values.code}
                   placeholder="Enter code"/>
        </React.Fragment>
    );
};

export default PasswordResetCode;