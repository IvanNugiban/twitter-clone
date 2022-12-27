import {gql} from "@apollo/client";


export const FOLLOW = gql`
mutation follow($followData : FollowModel!) {
follow(followData: $followData)
}
`

export const UNFOLLOW = gql`
mutation unfollow($pseudonym : String!) {
unfollow(pseudonym: $pseudonym)
}
`