import {gql} from "@apollo/client";

export const GET_ALL_COMMENTS = gql`
 query getAllComments($CommentData: commentFetch!) {
 getAllComments(CommentData: $CommentData) {
 hasMore, 
 comments {
 id, userRef ,text, media, gif, createdAt, tweetRef
 }
 }
 }   
`

export const GET_COMMENT_BY_ID = gql`
 query getCommentById($commentId: String!) {
 getCommentById(commentId: $commentId) {
  id, userRef ,text, media, gif, createdAt
 }
 }   
`