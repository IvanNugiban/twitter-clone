import {gql} from "@apollo/client";


export const GET_FOllOWING_AND_FOLLOWERS_AMOUNT = gql`
query getFollowingData($pseudonym : String!) {
getFollowingData(pseudonym: $pseudonym) {
followingAmount, followersAmount, isUserFollowing
}
}
`

export const GET_FOLLOWING = gql`
query getFollowing($pseudonym : String!) {
getFollowing(pseudonym: $pseudonym) {
avatar, username, pseudonym, description, isFollowing
}
}
`

export const GET_FOLLOWERS = gql`
query getFollowers($pseudonym : String!) {
getFollowers(pseudonym: $pseudonym) {
avatar, username, pseudonym, description, isFollowing
}
}
`