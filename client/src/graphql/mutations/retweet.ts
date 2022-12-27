import {gql} from "@apollo/client";

export const RETWEET = gql`
 mutation retweet($tweetId: ID!) {
 retweet(tweetId: $tweetId)
 }
`