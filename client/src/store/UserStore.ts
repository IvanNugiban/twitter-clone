import {makeAutoObservable} from "mobx";
import {ILoggedInUser, IUser} from "../types/interfaces/IUser";
import {IUserProfile} from "../types/interfaces/IUserProfile";
import ThemeStore from "./ThemeStore";
import DisplayService from "../services/displayService";
import TweetsStore from "./TweetsStore";
import BookmarksStore from "./BookmarksStore";
import ProfileTweetsStore from "./ProfileTweetsStore";

class UserStore implements IUser {
    username = "";
    pseudonym = "";
    email = "";
    birthday = "";
    dateOfJoining = "";
    avatar = "" as string | undefined;
    description = "" as string | undefined;
    profileBackground = "" as string | undefined;
    website = "" as string | undefined;
    bookmarks = [] as string[];
    likes = [] as string[];
    isLoggedIn: undefined | boolean = undefined;
    fontSizeLevel: string = "3";

    constructor() {
        makeAutoObservable(this);
    }

    auth(loginData: ILoggedInUser) {
        this.isLoggedIn = true;
        this.username = loginData.username;
        this.email = loginData.email;
        this.pseudonym = loginData.pseudonym;
        this.birthday = loginData.birthday;
        this.avatar = loginData.avatar;
        this.dateOfJoining = loginData.dateOfJoining;
        this.profileBackground = loginData.profileBackground;
        this.description = loginData.description;
        this.website = loginData.website;
        this.bookmarks = loginData.bookmarks;
        this.likes = loginData.likes;
        this.fontSizeLevel = loginData.fontSizeLevel || "3";
        localStorage.setItem("accessToken", loginData.accessToken);
        ThemeStore.initialize(loginData);
        DisplayService.handleFontSizeChange(loginData.fontSizeLevel)
    }

    logout() {
        this.username = "";
        this.pseudonym = "";
        this.email = "";
        this.birthday = "";
        this.dateOfJoining = "";
        this.avatar = "";
        this.profileBackground = "";
        this.website = "";
        this.description = "";
        this.bookmarks = [];
        this.likes = [];
        this.isLoggedIn = false;
        this.fontSizeLevel = "3";
        ThemeStore.reset();
        TweetsStore.reset();
        BookmarksStore.reset();
        ProfileTweetsStore.reset();
        localStorage.removeItem("accessToken");

    }

    updateProfile(updatedUser: IUserProfile) {
        this.username = updatedUser.username;
        this.birthday = updatedUser.birthday;
        this.avatar = updatedUser.avatar;
        this.profileBackground = updatedUser.profileBackground;
        this.description = updatedUser.description;
        this.website = updatedUser.website;
    }

    setFontSizeLevel(fontSizeLevel : string) {
        this.fontSizeLevel = fontSizeLevel;
    }

}

export default new UserStore();