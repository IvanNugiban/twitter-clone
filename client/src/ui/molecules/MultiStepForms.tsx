import React from 'react';
import {Form, Formik, FormikValues} from "formik";


interface IProps {
    initialValues: FormikValues;
    childrenArray: React.ReactElement[][];
    step: number;
    onSubmit: (values: FormikValues) => any;
}

const MultiStepForms = ({initialValues, childrenArray, step, onSubmit}: IProps) => {

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {props => (
                <Form>
                    {childrenArray[step - 1].map((children, index) => <React.Fragment key={index}>{React.cloneElement(children, {data : props})}</React.Fragment>)}
                </Form>
            )}

        </Formik>
    );
};

export default MultiStepForms;