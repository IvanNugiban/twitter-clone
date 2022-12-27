import {gql} from "@apollo/client";


export const LIKE_TWEET = gql`
 mutation likeTweet($tweetRef: String!) {
 likeTweet(tweetRef: $tweetRef)
 }
`