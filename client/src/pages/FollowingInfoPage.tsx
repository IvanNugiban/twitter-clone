import React from 'react';
import DocumentTitle from "react-document-title";
import PageHeader from "../ui/molecules/PageHeader";
import H5Title from "../ui/atoms/Typography/H5Title";
import ProfileNavbar from "../ui/molecules/ProfileNavbar";
import {useLocation} from "react-router-dom";
import styled from "styled-components";
import FollowingList from "../ui/molecules/FollowingList";
import FollowersList from "../ui/molecules/FollowersList";

interface IProps {
    username: string;
    pseudonym: string;
}

const StickyProfileNavbar = styled(ProfileNavbar)`
  position: sticky;
  top: 0;
  z-index: 1500;
  background-color: ${({theme}) => theme.backgroundColor};
`

const FollowingInfoPage = ({username, pseudonym}: IProps) => {

    const {pathname} = useLocation();
    const isFollowingPage = pathname.includes(`${pseudonym}/following`);


    return (
        <React.Fragment>
            <DocumentTitle title={`People ${isFollowingPage ? "followed by" : "following"} ${username}`}/>
            <PageHeader subTitle={`@${pseudonym}`} content={<H5Title>{username}</H5Title>}/>
            <StickyProfileNavbar items={[{
                pathname: `/${pseudonym}/following`,
                text: "Following"
            }, {
                pathname: `/${pseudonym}/followers`,
                text: "Followers"
            }
            ]}/>
                {isFollowingPage ? <FollowingList pseudonym={pseudonym}/> : <FollowersList pseudonym={pseudonym}/>}
            </React.Fragment>
    );
};

export default FollowingInfoPage;