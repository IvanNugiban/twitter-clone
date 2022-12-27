import ITheme from "../interfaces/ITheme";

declare module "styled-components" {
    export interface DefaultTheme extends ITheme {}
}