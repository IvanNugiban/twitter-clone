import {IUser} from "../interfaces/UserInterface";

export class UserDto{
    readonly id: string;
    readonly dateOfJoining: string;
    username: string;
    birthday: string;
    description?: string
    email: string;
    pseudonym: string;
    avatar?: string;
    profileBackground?:string;
    website?: string;
    bookmarks?: string[];
    likes: string[]
    fontSizeLevel?: string;
    color?: string;
    theme?: string;



    constructor(model: IUser) {
        this.email = model.email;
        this.username = model.username;
        this.pseudonym = model.pseudonym;
        this.id = model._id;
        this.birthday = model.birthday;
        this.dateOfJoining = model.dateOfJoining;
        this.avatar = model.avatar;
        this.profileBackground = model.profileBackground;
        this.website = model.website;
        this.bookmarks = model.bookmarks;
        this.likes = model.likes;
        this.description = model.description;
        this.fontSizeLevel = model.fontSizeLevel;
        this.color = model.color ;
        this.theme = model.theme;
    }
}