import {gql} from "@apollo/client";


export const GET_RANDOM_HASHTAGS = gql`
 query getRandomHashtags {
 getRandomHashtags {
 hashtag, numberOfTweets, tweets
 }
 }   
`