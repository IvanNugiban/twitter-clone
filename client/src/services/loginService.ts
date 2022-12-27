import {MutationFunction} from "@apollo/client";
import {FormikValues} from "formik";
import UserStore from "../store/UserStore";


class loginService {
    async checkLoginData(checkLoginData: MutationFunction, values: FormikValues) {
        await checkLoginData({
            variables: {
                user: values.emailOrUsername
            }
        })

        return;
    }

   async login(loginFunction : MutationFunction, values: FormikValues) {
       const response = await loginFunction({
           variables: {
               LoginInput: {
                   emailOrUsername: values.emailOrUsername,
                   password: values.password
               }
           }
       })

      return UserStore.auth(response.data.login)

    }
}

export default new loginService;