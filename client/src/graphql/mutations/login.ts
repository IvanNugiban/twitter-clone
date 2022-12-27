import {gql} from "@apollo/client";


export const CHECK_LOGIN_DATA = gql`
mutation checkLoginData($user: String!) {
checkLoginData(user: $user)
}
`

export const RESET_PASSWORD = gql`
mutation resetPassword($NewPasswordData : PasswordResetData!) {
resetPassword(NewPasswordData : $NewPasswordData)
}
`

export const LOGIN = gql`
mutation login($LoginInput: LoginType!) {
login(LoginInput: $LoginInput) {
username, email, pseudonym, dateOfJoining, birthday, bookmarks, likes, avatar, accessToken, profileBackground, website, description, fontSizeLevel, color, theme
}
}
`

export const LOGOUT = gql`
mutation{
logout
}
`


export const CHECK_PASSWORD_RESET_CODE = gql`
mutation checkPasswordResetCode($Verification : PasswordResetCodeModel!) {
checkPasswordResetCode(Verification : $Verification)
}
`

export const UNAUTHORIZED_LOGOUT = `
mutation{
logout
}
`