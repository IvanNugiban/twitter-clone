import {gql} from "@apollo/client";


export const AUTH = gql`
query {
refresh {
username, email, pseudonym, dateOfJoining, birthday, bookmarks, likes, avatar, accessToken, profileBackground, website, description, fontSizeLevel, color, theme
}
}
`

export const FETCH_ACCESS_TOKEN = `
query {
refresh {
accessToken
}
}
`