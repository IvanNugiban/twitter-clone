import {gql} from "@apollo/client";


export const GET_USER = gql`
query getUser($pseudonym : String!) {
getUser(pseudonym: $pseudonym) {
username, pseudonym, dateOfJoining, description, website, avatar, profileBackground
}
}
`

export const GET_SEARCHED_USERS = gql`
query getSearchedUsers($UsersSearch: UserSearch!) {
getSearchedUsers(UsersSearch: $UsersSearch) {
users {
username, pseudonym, avatar
}, hasMore
}
}
`