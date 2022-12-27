import {gql} from "@apollo/client";

export const CREATE_TWEET = gql`
mutation createTweet($TweetData: Tweet!) {
createTweet(TweetData: $TweetData) {
text
}
}
`

export const DELETE_TWEET = gql`
 mutation deleteTweet($tweetId: String!) {
 deleteTweet(tweetId : $tweetId)
 }
`

