import {FETCH_ACCESS_TOKEN} from "../graphql/queries/auth";
import UserStore from "../store/UserStore";
import {UNAUTHORIZED_LOGOUT} from "../graphql/mutations/login";
import {ApolloClient, NormalizedCacheObject} from "@apollo/client";

class AuthService {
    async refreshToken(client: ApolloClient<NormalizedCacheObject>, retryData: {
        shouldRetry: boolean,
        hasError: boolean,
        shouldStart: boolean
    }) {
        const result = await fetch(`${process.env.REACT_APP_URI}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify({
                query: FETCH_ACCESS_TOKEN
            })
        })
        const response = await result.json();
        if (!response.data) {
            retryData.hasError = true;
            UserStore.logout();
            await fetch(`${process.env.REACT_APP_URI}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    query: UNAUTHORIZED_LOGOUT
                })
            })
            alert("Please, login again")
            retryData.shouldStart = false;
            return await client.clearStore();
        }
        retryData.shouldRetry = true;
        retryData.shouldStart = false;
        localStorage.setItem("accessToken", response.data.refresh.accessToken);
    }
}


export default new AuthService();