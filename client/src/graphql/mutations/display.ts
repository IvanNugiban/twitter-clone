import {gql} from "@apollo/client";

export const SET_FONT_SIZE = gql`
mutation setFontSize($fontSize: String!) {
setFontSize(fontSize: $fontSize)
}
`

export const SET_THEME = gql`
mutation setTheme($theme: String!) {
setTheme(theme: $theme)
}
`

export const SET_COLOR = gql`
mutation setColor($color: String!) {
setColor(color: $color)
}
`