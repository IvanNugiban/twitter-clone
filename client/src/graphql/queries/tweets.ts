import {gql} from "@apollo/client";


export const GET_HOME_TWEETS = gql`
query getHomeTweets($HomeTweetsData: HomeTweets!) {
 getHomeTweets(HomeTweetsData: $HomeTweetsData) {
 tweets {
 text, media, gif, createdAt, id, userRef
 }, hasMore
 }
}   
`

export const GET_SEARCHED_TWEETS = gql`
query getSearchedTweets($TweetSearch: TweetSearch!) {
getSearchedTweets(TweetSearch: $TweetSearch) {
tweets {
 text, media, gif, createdAt, id, userRef
}, hasMore
}
}
`

export const GET_PROFILE_TWEETS = gql`
query getProfileTweets($ProfileTweetsData: TweetsLimit!) {
 getProfileTweets(ProfileTweetsData: $ProfileTweetsData) {
 tweets {
 text, media, gif, createdAt, id, userRef
 }, hasMore
 }
}   
`


export const GET_RETWEETS = gql`
query getRetweets($ProfileTweetsData: TweetsLimit!) {
 getRetweets(ProfileTweetsData: $ProfileTweetsData) {
 tweets {
 text, media, gif, createdAt, id, userRef
 }, hasMore
 }
}   
`


export const GET_TWEETS_WITH_MEDIA = gql`
query getTweetsWithMedia($ProfileTweetsData: TweetsLimit!) {
 getTweetsWithMedia(ProfileTweetsData: $ProfileTweetsData) {
 tweets {
 text, media, gif, createdAt, id, userRef
 }, hasMore
 }
}   
`


export const GET_LIKED_TWEETS = gql`
query getLikedTweets($ProfileTweetsData: TweetsLimit!) {
 getLikedTweets(ProfileTweetsData: $ProfileTweetsData) {
 tweets {
 text, media, gif, createdAt, id, userRef
 }, hasMore
 }
}   
`

export const GET_TWEET_BY_ID = gql`
query getTweetById($tweetId: String!) {
 getTweetById(tweetId: $tweetId) {
 text, media, gif, createdAt, id, userRef
 }
}  
`

export const GET_BOOKMARKS = gql`
query getBookmarks($ProfileTweetsData: TweetsLimit!) {
 getBookmarks(ProfileTweetsData: $ProfileTweetsData) {
 tweets {
 text, media, gif, createdAt, id, userRef
 }, hasMore
 }
 }
`


export const GET_ALL_TWEETS = gql`
query getAllTweets($ProfileTweetsData: TweetsLimit!) {
getAllTweets(ProfileTweetsData: $ProfileTweetsData) {
tweets {
 text, media, gif, createdAt, id, userRef
 }, hasMore
}
}
`

export const GET_COMMUNICATE_DATA = gql`
query getCommunicateData($tweetId: String!) {
getCommunicateData(tweetId: $tweetId) {
likes, isUserLiked, comments, retweets, isUserRetweeted, isTweetBookmarked
}
}
`

