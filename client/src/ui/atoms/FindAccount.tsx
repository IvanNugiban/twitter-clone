import React from 'react';
import {FormikProps, FormikValues} from "formik";
import Loader from "./Loader";
import Input from "./Input";

interface IProps {
    data?: FormikProps<FormikValues>;
    isLoading: boolean;
}

const FindAccount = ({data, isLoading}: IProps) => {

    if (!data) return <Loader/>;

    return (
        <React.Fragment>
            <Input disabled={isLoading} autoFocus name="emailOrPseudonym" onChange={data.handleChange} value={data.values.emailOrPseudonym}
                   placeholder="Email or pseudonym"/>
        </React.Fragment>
    );
};

export default FindAccount;