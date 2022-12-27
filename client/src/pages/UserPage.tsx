import React, {useEffect, useRef, useState} from 'react';
import {useMutation, useQuery} from "@apollo/client";
import {GET_USER} from "../graphql/queries/user";
import {useLocation, useNavigate} from "react-router-dom";
import CenteredLoader from "../ui/atoms/CenteredLoader";
import ProfileInfo from "../ui/organism/ProfileInfo";
import Button from "../ui/atoms/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import styled from "styled-components";
import {FOLLOW, UNFOLLOW} from "../graphql/mutations/following";
import Alert from "../ui/atoms/Alert";
import FollowButton from "../ui/atoms/FollowButton";
import FollowingStore from "../store/FollowingStore";
import {observer} from "mobx-react-lite";
import AnotherUserStore from "../store/AnotherUserStore";
import Loader from "../ui/atoms/Loader";
import UserProfilePopover from "../ui/molecules/UserProfilePopover";
import H3Title from "../ui/atoms/Typography/H3Title";
import Paragraph from "../ui/atoms/Typography/Paragraph";
import SubTitle from "../ui/atoms/Typography/SubTitle";

const MoreAndFollowButtons = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 150px;
  gap: 10px;

  .ellipsisButton {
    position: relative;
    display: inline-block;
    flex-shrink: 3;
    height: 35px;
    width: 35px;

    svg {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  button:nth-child(2) {
    min-width: 100px;
    flex-shrink: 1.5;
  }
`

const ErrorMessage = styled.div`
  width: 80%;
  margin: 200px auto 0 auto;
  button {
    width: 70%;
    margin-top: 25px;
  }
`

const UserPage = observer(() => {

    const {pathname} = useLocation();
    const navigate = useNavigate();
    const [isPopoverActive, setPopoverState] = useState(false);


    const {loading, data, error} = useQuery(GET_USER, {
        variables: {
            pseudonym: pathname.slice(1, pathname.indexOf("/", 1) === -1 ? undefined : pathname.indexOf("/", 1))
        }
    })


    const [follow, {error: followError, loading: followLoading}] = useMutation(FOLLOW);
    const [unfollow, {error: unfollowError, loading: unfollowLoading}] = useMutation(UNFOLLOW);
    const moreButtonRef = useRef(null);

    useEffect(() => {
        if (error) return;
        if (data) AnotherUserStore.setAnotherUser(data.getUser.pseudonym, data.getUser.username);
    }, [error, data])


    if (error) return <ErrorMessage>
        <SubTitle>This account doesn’t exist</SubTitle>
        <Paragraph>Try searching for another.</Paragraph>
        <Button onClick={() => navigate(-1)}>Back</Button>
    </ErrorMessage>
    if (followLoading || unfollowLoading) return <Loader/>

    return (
        <React.Fragment>
            {loading || error ? <CenteredLoader/> :
                <React.Fragment>
                    <ProfileInfo user={data.getUser}
                                 additionalFunctional={<MoreAndFollowButtons>
                                     <Button className="ellipsisButton" ref={moreButtonRef}
                                             onClick={() => setPopoverState(true)} type="secondary"><FontAwesomeIcon
                                         icon={solid("ellipsis")}/></Button>
                                     <FollowButton followed={FollowingStore.isUserFollowing} follow={async () => {
                                         await follow({
                                             variables: {
                                                 followData: {
                                                     pseudonym: data.getUser.pseudonym,
                                                     isUserFollowing: FollowingStore.isUserFollowing
                                                 }
                                             }
                                         })
                                         FollowingStore.refetch();
                                     }} unfollow={async () => {
                                         await unfollow({
                                             variables: {
                                                 pseudonym: data.getUser.pseudonym,
                                             }
                                         })
                                         FollowingStore.refetch();
                                     }}/>
                                     <UserProfilePopover parentRef={moreButtonRef} pseudonym={data.getUser.pseudonym}
                                                         isActive={isPopoverActive}
                                                         closePopover={() => setPopoverState(false)}/>
                                 </MoreAndFollowButtons>}/>
                </React.Fragment>}
            {(followError || unfollowError) &&
                <Alert text={followError ? followError.message : unfollowError!.message} interval={3000}/>}
        </React.Fragment>
    );
});

export default UserPage;