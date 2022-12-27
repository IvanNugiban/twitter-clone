import {gql} from "@apollo/client";


export const SAVE_CHANGES = gql`
mutation saveChanges($Profile: ProfileInputModel!) {
saveChanges(Profile: $Profile) {
username, website, description, avatar, profileBackground, birthday
}
}
`