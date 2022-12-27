import React, {useEffect} from 'react';
import PageHeader from "../molecules/PageHeader";
import H4Title from "../atoms/Typography/H4Title";
import DocumentTitle from "react-document-title";
import styled from "styled-components";
import {IUser} from "../../types/interfaces/IUser";
import H3Title from "../atoms/Typography/H3Title";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {regular, solid} from '@fortawesome/fontawesome-svg-core/import.macro';
import Paragraph from '../atoms/Typography/Paragraph';
import dayjs from "dayjs";
import {Link, Outlet} from 'react-router-dom';
import H5Title from "../atoms/Typography/H5Title";
import ProfileAvatar from "../atoms/ProfileAvatar";
import ProfileImage from "../atoms/ProfileImage";
import {default as LinkToWebsite} from "../atoms/Link"
import {useQuery} from "@apollo/client";
import {GET_FOllOWING_AND_FOLLOWERS_AMOUNT} from "../../graphql/queries/following";
import CenteredLoader from "../atoms/CenteredLoader";
import ProfileNavbar from "../molecules/ProfileNavbar";
import {observer} from "mobx-react-lite";
import FollowingStore from "../../store/FollowingStore";
import formatNumber from "../../helpers/formatNumber";
import ProfileTweetsStore from "../../store/ProfileTweetsStore";


const ImageAndAdditionalFunctional = styled.div`
  display: flex;
  justify-content: space-between;

  span {
    padding-top: 20px;
  }
`

const ProfileInfoBlock = styled.div`
  margin-top: 20px;
  padding-top: 20px;

  h5 {
    font-weight: 400;
    color: #677682;
  }

  @media screen and ${({theme}) => theme.media.mobileL} {
    padding-top: 0;
  }

`

const FollowingAndFollowers = styled.span`
  color: #677682;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;

  a:hover {
    text-decoration: underline;
  }
`

const Description = styled(Paragraph)`
  word-wrap: break-word;
  margin-top: 10px;
`

const DateOfJoiningAndWebsite = styled(FollowingAndFollowers)`
  color: #677682;
  display: flex;
  align-items: center;
  margin: 10px 0;
  gap: 10px;

  p {
    margin-right: 10px;
  }
`

const TweetsWrapper = styled.div`
  @media screen and ${({theme}) => theme.media.mobileL} {
    margin-bottom: 70px;
  }
`

const MarginedProfileImage = styled(ProfileImage)`
  margin-left: -15px;
  min-width: calc(100% + 30px);
`

const WebsiteLinkParagraph = styled(Paragraph)`
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 500px;
  
  @media screen and ${({theme}) => theme.media.tablet} {
    max-width: 40vw;
  }
`

interface IProps {
    user: IUser;
    additionalFunctional: React.ReactNode;
}


const ProfileInfo = observer(({user, additionalFunctional}: IProps) => {

    const {data, loading, error, refetch} = useQuery(GET_FOllOWING_AND_FOLLOWERS_AMOUNT, {
        variables: {
            pseudonym: user.pseudonym
        }
    })


    useEffect(() => {
        if (!data || error) return;
        FollowingStore.setFollowingAndFollowersAmount(data.getFollowingData, refetch)
    }, [data])

    useEffect(() => {
        return () => {
            ProfileTweetsStore.reset();
            FollowingStore.reset();
        }
    }, [])

    if (loading) return <CenteredLoader/>


    return (
        <React.Fragment>
            <PageHeader subTitle={`${ProfileTweetsStore.tweets.length} tweets`}
                        content={<H4Title>{user.username}</H4Title>}/>
            <DocumentTitle title={`${user.username} (@${user.pseudonym}) / Twitter`}/>
            <div className="wrapper">

                <MarginedProfileImage enlarged image={user.profileBackground}/>
                <div>
                    <ImageAndAdditionalFunctional>
                        <ProfileAvatar enlarged avatar={user.avatar}/>
                        <span>
                       {additionalFunctional}
                        </span>
                    </ImageAndAdditionalFunctional>
                    <ProfileInfoBlock>
                        <H3Title>{user.username}</H3Title>
                        <H5Title>@{user.pseudonym}</H5Title>
                        {user.description && <Description>{user.description}</Description>}
                        <DateOfJoiningAndWebsite>
                            {user.website && <React.Fragment>
                                <FontAwesomeIcon icon={solid("link")}/>
                                <WebsiteLinkParagraph><LinkToWebsite href={user.website}>{user.website}</LinkToWebsite></WebsiteLinkParagraph>
                            </React.Fragment>}
                            <FontAwesomeIcon fontSize="1.2rem" icon={regular("calendar-days")}/>
                            <Paragraph>Joined {dayjs(user.dateOfJoining).format(`MMMM YYYY`)}</Paragraph>
                        </DateOfJoiningAndWebsite>
                        <FollowingAndFollowers>
                            <Link to={`/${user.pseudonym}/following`}><Paragraph
                                fontSize="0.9rem">{formatNumber(FollowingStore.followingAmount)} Following</Paragraph></Link>
                            <Link to={`/${user.pseudonym}/followers`}><Paragraph
                                fontSize="0.9rem">{formatNumber(FollowingStore.followersAmount)} Followers</Paragraph></Link>
                        </FollowingAndFollowers>
                    </ProfileInfoBlock>
                </div>
            </div>
            <ProfileNavbar gridColumns="1fr 1.5fr 1fr 1fr" items={[{
                pathname: `/${user.pseudonym}`,
                text: "Tweets"
            }, {
                pathname: `/${user.pseudonym}/retweets`,
                text: "Retweets"
            }, {
                pathname: `/${user.pseudonym}/media`,
                text: "Media"
            }, {
                pathname: `/${user.pseudonym}/likes`,
                text: "Likes"
            }]}/>
            <TweetsWrapper>
                <Outlet/>
            </TweetsWrapper>
        </React.Fragment>
    );
});

export default ProfileInfo;