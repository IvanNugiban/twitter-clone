import React, {useEffect} from 'react';
import RootRouter from "./navigation/RootRouter";
import Navbar from "./ui/organism/Navbar";
import {useLocation} from "react-router-dom";
import Container from "./ui/atoms/Container";
import {useQuery} from "@apollo/client";
import {AUTH} from "./graphql/queries/auth";
import UserStore from "./store/UserStore";
import styled, {css, ThemeProvider} from "styled-components";
import LogoLoader from "./ui/atoms/LogoLoader";
import ThemeStore from "./store/ThemeStore";
import GlobalStyles from './globalStyles';
import {observer} from "mobx-react-lite";


const SearchSection = React.lazy(() => import("./ui/organism/SearchSection"));

const AppWithStyles = css`
  display: flex;
`


const StyledApp = styled.div<AppProps>`
  ${({hasStyles}) => {
    if (hasStyles) return AppWithStyles
  }}
  .main {
    position: relative;
    max-width: 600px;
    min-height: 100vh;
    width: 100%;
    border-right: 1px solid ${({theme}) => theme.colors.gray_thin};
    border-left: 1px solid ${({theme}) => theme.colors.gray_thin};

    .wrapper {
      padding: 0 15px;
      position: relative;
    }

    @media screen and ${({theme}) => theme.media.mobileL} {
      border: none;
    }
  }
`

interface AppProps {
    hasStyles: boolean;
}


const App = observer(() => {

    const {loading, data, error} = useQuery(AUTH);
    const {pathname} = useLocation();
    const notTheLoginPage = pathname !== "/" && pathname !== "/password_reset";
    

    useEffect(() => {
        if (loading) return;
        if (error) return UserStore.logout();
        UserStore.auth(data.refresh);
    }, [loading])


    return (
        <ThemeProvider theme={ThemeStore.theme}>
            <GlobalStyles/>
            {loading ? <LogoLoader/> : notTheLoginPage ? <Container>
                <StyledApp hasStyles={true}>
                    <Navbar/>
                    <main className="main"><RootRouter/></main>
                    <React.Suspense> <SearchSection/></React.Suspense>
                </StyledApp>
            </Container> : <StyledApp hasStyles={false}><RootRouter/></StyledApp>}
        </ThemeProvider>

    );
})

export default App;
