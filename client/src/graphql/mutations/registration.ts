import {gql} from "@apollo/client";

export const CHECK_REGISTER_DATA = gql`
mutation checkRegisterData($User: UserInput!) {
checkRegisterData(User: $User) {
email
}
}
`

export const CHECK_VERIFICATION_CODE = gql`
mutation checkVerificationCode($Verification: VerificationModel!) {
checkVerificationCode(Verification: $Verification) {
username, email, pseudonym, dateOfJoining, birthday, bookmarks, likes, avatar, accessToken, profileBackground, website, description, fontSizeLevel, color, theme
}
}
`

export const RESEND_VERIFICATION_CODE = gql`
mutation sendVerificationCode($Email: String!) {
sendVerificationCode(Email: $Email)
}
`