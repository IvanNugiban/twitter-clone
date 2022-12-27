export interface IUser {
    _id: string;
    username: string;
    pseudonym: string;
    description?: string;
    email: string;
    password: string;
    birthday: string;
    dateOfJoining: string;
    avatar?: string;
    profileBackground?: string;
    website?: string;
    bookmarks?: string[];
    likes: string[]
    fontSizeLevel?: string;
    color?: string;
    theme?: string;
}