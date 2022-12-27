import React, {useRef, useState} from 'react';
import styled, {keyframes} from "styled-components";
import useOutsideClickDetector from "../../hooks/useOutsideClickDetector";
import H5Title from '../atoms/Typography/H5Title';
import CloseButton from "../atoms/CloseButton";
import Avatar from "../atoms/Avatar";
import {observer} from "mobx-react-lite";
import UserStore from "../../store/UserStore";
import Paragraph from "../atoms/Typography/Paragraph";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import HamburgerMenuList from "../atoms/HamburgerMenuList";
import Details from "../molecules/Details";
import {Link, useNavigate} from "react-router-dom";
import {useMutation, useQuery} from "@apollo/client";
import {LOGOUT} from "../../graphql/mutations/login";
import Loader from "../atoms/Loader";
import {GET_FOllOWING_AND_FOLLOWERS_AMOUNT} from "../../graphql/queries/following";
import CenteredLoader from "../atoms/CenteredLoader";
import FallbackSuspense from "../atoms/FallbackSuspense";
import formatNumber from "../../helpers/formatNumber";

const DisplayChanger = React.lazy(() => import("./DisplayChanger"))

const appearAnimation = keyframes`
  from {
    left: -300px;
  }

  to {
    left: 0;
  }
`

const HamburgerMenuWrapper = styled.div<WrapperProps>`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1600;
  background-color: rgb(100, 100, 100, 0.50);
  display: ${({isOpened}) => isOpened ? "block" : "none"};


  @media screen and (min-width: 501px) {
    display: none;
  }
`


const StyledHamburgerMenu = styled.aside`
  position: absolute;
  left: 0;
  top: 0;
  overflow: auto;
  width: 280px;
  animation: ${appearAnimation} 0.3s;
  height: 100%;
  background-color: ${({theme}) => theme.backgroundColor};
`

const HamburgerMenuHeader = styled.header`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  padding: 0 16px;
  align-items: center;
`

const AccountInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: 60px 16px 16px 16px;
  margin-bottom: 20px;

  svg {
    margin-bottom: 5px;
  }

  span {
    display: flex;
    gap: 10px;
    margin-top: 15px;

    p:hover {
      text-decoration: underline;
    }
  }
`

const HamburgerMenuAvatar = styled(Avatar)`
  img, svg {
    width: 60px;
    height: 60px;
  }
`


interface WrapperProps {
    isOpened: boolean;
}

interface IProps extends WrapperProps {
    closeMenu: () => void
}

const HamburgerMenu = observer(({isOpened, closeMenu}: IProps) => {

    const [isDisplayChangerActive, setDisplayChangerState] = useState(false);
    const [logout, {loading}] = useMutation(LOGOUT);
    const {data, loading: followingLoading, error} = useQuery(GET_FOllOWING_AND_FOLLOWERS_AMOUNT, {
        variables: {
            pseudonym: UserStore.pseudonym
        }
    })
    const hamburgerMenuRef = useRef(null);
    const navigate = useNavigate();


    useOutsideClickDetector(hamburgerMenuRef, () => {
        if (!isDisplayChangerActive) closeMenu();
    });

    return (
        <HamburgerMenuWrapper isOpened={isOpened}>
            <StyledHamburgerMenu ref={hamburgerMenuRef}>
                {followingLoading || error ? <CenteredLoader/> :
                    <React.Fragment>
                        <HamburgerMenuHeader>
                            <H5Title>Account info</H5Title>
                            <CloseButton onClick={closeMenu}/>
                        </HamburgerMenuHeader>
                        <main>
                            <AccountInfo>
                                <HamburgerMenuAvatar avatar={UserStore.avatar}/>
                                <H5Title>{UserStore.username}</H5Title>
                                <Paragraph>@{UserStore.pseudonym}</Paragraph>
                                <span>
                                    <Link to={`/${UserStore.pseudonym}/following`}><Paragraph
                                        fontSize="0.9rem"><strong>{formatNumber(data.getFollowingData.followingAmount)}</strong> Following</Paragraph></Link>
                                    <Link to={`/${UserStore.pseudonym}/followers`}><Paragraph
                                        fontSize="0.9rem"><strong>{formatNumber(data.getFollowingData.followersAmount)}</strong> Followers</Paragraph></Link>
                        </span>
                            </AccountInfo>
                            <HamburgerMenuList pseudonym={UserStore.pseudonym}/>
                        </main>
                        <footer>
                            <Details title="Settings" items={[{
                                icon: solid("gear"),
                                text: "Settings and privacy",
                                callback: () => navigate("/settings")
                            }, {
                                icon: solid("palette"),
                                text: "Display",
                                callback: () => setDisplayChangerState(true)
                            }, {
                                icon: solid("arrow-right-from-bracket"),
                                text: "Log out",
                                callback: async () => {
                                    await logout();
                                    UserStore.logout();
                                }
                            }]}/>
                        </footer>
                    </React.Fragment>
                }
            </StyledHamburgerMenu>
            {(loading) && <Loader/>}
            {isDisplayChangerActive && <FallbackSuspense><DisplayChanger
                closeDisplayChanger={() => setDisplayChangerState(false)}/></FallbackSuspense>}
        </HamburgerMenuWrapper>
    );
});

export default HamburgerMenu;