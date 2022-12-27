import React from 'react';
import styled from "styled-components";
import Avatar from '../atoms/Avatar';
import H6Title from "../atoms/Typography/H6Title";
import FollowButton from "../atoms/FollowButton";
import Paragraph from "../atoms/Typography/Paragraph";
import {useNavigate} from "react-router-dom";
import {ApolloQueryResult, useMutation} from "@apollo/client";
import {FOLLOW, UNFOLLOW} from "../../graphql/mutations/following";
import Loader from "../atoms/Loader";
import Alert from "../atoms/Alert";
import userStore from "../../store/UserStore";


const StyledUserCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  transition: 0.3s all;
  cursor: pointer;

  h6:hover {
    text-decoration: underline;
  }

  &:hover {
    transition: 0.3s all;
    background-color: ${({theme}) => theme.colors.gray_thin};
  }
`

const ContentWrapper = styled.div`
  display: flex;
  gap: 10px;

  p:first-of-type {
    color: ${({theme}) => theme.colors.black}
  }

  @media screen and ${({theme}) => theme.media.mobile} {
    p:last-of-type {
      width: 150px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
`

const ButtonWrapper = styled.div<FollowButtonProps>`
  button {
    display: ${({withoutFollowButton}) => withoutFollowButton ? "none" : "inline-block"};
    width: 90px;
    padding: 5px;
    height: 35px;
  }
`

const ProfileAvatar = styled(Avatar)`
  img {
    min-width: 40px;
    min-height: 40px;
  }

  svg {
    font-size: 2.5rem;
  }
  
`

interface FollowButtonProps {
    withoutFollowButton: boolean;
}

interface IProps {
    pseudonym: string;
    username: string;
    avatar?: string;
    description?: string;
    isFollowing: boolean;
    refetch?: any;
    className?: string;
    withoutFollowButton?: boolean;
}

const UserCard = ({pseudonym, username, avatar, description, isFollowing, refetch, className, withoutFollowButton = false}: IProps) => {

    const navigate = useNavigate();
    const [follow, {loading, error}] = useMutation(FOLLOW);
    const [unfollow, {loading: unfollowLoading, error: unfollowError}] = useMutation(UNFOLLOW);


    return (
        <StyledUserCard className={className} onClick={(e: any) => {
            if (e.target.tagName !== "BUTTON") navigate(`/${pseudonym}`)
        }}>
            <ContentWrapper>
                <ProfileAvatar avatar={avatar}/>
                <span>
                    <H6Title>{username}</H6Title>
                    <Paragraph>@{pseudonym}</Paragraph>
                    {description &&
                        <Paragraph>{description.length > 100 ? description.slice(0, 100) + "..." : description}</Paragraph>}
                </span>
            </ContentWrapper>
            <ButtonWrapper withoutFollowButton={withoutFollowButton}>
                {userStore.pseudonym !== pseudonym && <FollowButton followed={isFollowing} follow={async () => {
                    await follow({
                        variables: {
                            followData: {
                                pseudonym,
                                isUserFollowing: isFollowing
                            }
                        }
                    });
                    if (error) return;
                    refetch?.();
                }} unfollow={async () => {
                    await unfollow({variables: {pseudonym}});
                    if (unfollowError) return;
                    refetch?.();
                }}/>}
            </ButtonWrapper>
            {(loading || unfollowLoading) && <Loader/>}
            {(error || unfollowError) && <Alert text={error ? error.message : unfollowError!.message} interval={3000}/>}
        </StyledUserCard>
    );
};

export default UserCard;