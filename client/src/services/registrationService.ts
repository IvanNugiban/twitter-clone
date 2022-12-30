import {MutationFunction} from "@apollo/client";
import {FormikValues} from "formik";
import UserStore from "../store/UserStore";
import {ILoggedInUser} from "../types/interfaces/IUser";


class RegistrationService {
    async checkRegisterData(checkRegisterData: MutationFunction, values: FormikValues) {
        await checkRegisterData({
            variables: {
                User: {
                    username: values.username.trim(),
                    pseudonym: values.pseudonym.trim(),
                    email: values.email.trim(),
                    birthday: values.birthday,
                    password: values.password.trim()
                }
            }
        })
    }

    async checkVerificationCode(checkVerificationCode: MutationFunction, values: FormikValues) {
        const response = await checkVerificationCode({
            variables: {
                Verification: {
                    user: {
                            username: values.username.trim(),
                            pseudonym: values.pseudonym.trim(),
                            email: values.email.trim(),
                            password: values.password.trim(),
                            dateOfJoining: new Date(),
                            birthday: values.birthday
                    },
                    code: Number(values.code)
                },
            }
        })

        const data : ILoggedInUser = response.data.checkVerificationCode;

        localStorage.setItem("accessToken", data.accessToken);

        UserStore.auth(data);

    }
}

export default new RegistrationService();