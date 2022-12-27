import {gql} from "@apollo/client";

export const ADD_BOOKMARK = gql`
 mutation addBookmark($tweetId: ID!) {
 addBookmark(tweetId: $tweetId)
 }
`

export const CLEAR_ALL_BOOKMARKS = gql`
 mutation {
 clearAllBookmarks
 }   
`