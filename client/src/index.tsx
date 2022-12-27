import React from 'react';
import ReactDOM from 'react-dom/client'
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {ApolloClient, ApolloLink, ApolloProvider, createHttpLink, from, InMemoryCache} from '@apollo/client';
import {RetryLink} from "@apollo/client/link/retry";
import AuthService from "./services/authService";

const retryData = {
    shouldRetry: true,
    hasError: false,
    shouldStart: false
}

const httpLink = createHttpLink({
    uri: process.env.REACT_APP_URI,
    credentials: "include"
});

const authLink = new ApolloLink((operation, forward) => {
    operation.setContext(({headers = {}}) => ({
        headers: {
            ...headers,
            authorization: `Bearer ${localStorage.getItem('accessToken')}` || "",
        },
    }));

    return forward(operation);
})

const recoveryLink = new RetryLink({
    delay: {
        initial: 1500,
        max: 10000,
        jitter: true
    },
    attempts: (count, operation, error) => {
        if (!retryData.shouldStart) return false;
        if (retryData.hasError) {
            retryData.hasError = false;
            retryData.shouldRetry = true;
            return false;
        }
        if (count === 6 || !error) {
            retryData.shouldRetry = true;
            return false
        }
        return !!error;
    }
});


const ErrorLink = new ApolloLink((operation, forward) => {
    return forward(operation).map((data) => {
        if (data && data.errors && data.errors.length > 0) {
            const exceptionObject = data!.errors![0].extensions.exception as {
                status: number,
                message: string
            }
            if ( exceptionObject?.status === 401 && exceptionObject?.message === "Auth error" && retryData.shouldRetry && !retryData.hasError) {
                retryData.shouldRetry = false;
                retryData.shouldStart = true;
                AuthService.refreshToken(client, retryData);
                throw new Error();
            }
        }
        return data;
    });
})


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const client = new ApolloClient({
    link: from([
        recoveryLink,
        ErrorLink,
        authLink,
        httpLink
    ]),
    cache: new InMemoryCache()
})



root.render(
    <React.StrictMode>
            <ApolloProvider client={client}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </ApolloProvider>
    </React.StrictMode>
)
;



