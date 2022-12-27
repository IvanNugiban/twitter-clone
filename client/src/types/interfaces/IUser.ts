import ColorsEnum from "../enums/ColorsEnum";
import ThemeEnum from "../enums/ThemeEnum";

export interface IUser {
    username: string;
    pseudonym: string;
    description?: string;
    email: string;
    birthday: string;
    dateOfJoining: string;
    avatar?: string;
    profileBackground?: string;
    website?: string;
    bookmarks: string[];
    likes: string[];
    fontSizeLevel: string;
}

export interface ILoggedInUser extends IUser {
    accessToken: string;
    color?: ColorsEnum;
    theme?: ThemeEnum;
}