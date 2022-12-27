import {gql} from "@apollo/client";


export const CREATE_COMMENT = gql`
 mutation createComment($commentData: CommentsInput!) {
 createComment(commentData : $commentData)
 }  
`
