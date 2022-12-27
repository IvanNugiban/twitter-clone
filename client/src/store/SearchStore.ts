import {makeAutoObservable} from "mobx";
import {ITweet} from "../types/interfaces/ITweet";
import {IUser} from "../types/interfaces/IUser";


class SearchStore {
    tweets: ITweet[] = [];
    users: IUser[] = [];
    initialLimit = 15;
    tweetsLimit = 0;
    usersLimit = 0;

    constructor() {
        makeAutoObservable(this);
    }

    setTweets(tweets: ITweet[]) {
        this.tweets = [...this.tweets, ...tweets].filter((v, i, a) => a.findIndex(v2 => (v2.id === v.id)) === i);
    }

    setUsers(users: IUser[]) {
        this.users = [...this.users, ...users].filter((v, i, a) => a.findIndex(v2 => (v2.pseudonym === v.pseudonym)) === i);
    }


    tweetsIncreaseLimit() {
        this.tweetsLimit += this.initialLimit;
    }

    usersIncreaseLimit() {
        this.usersLimit += this.initialLimit;
    }

    reset() {
        this.tweets = [];
        this.users = [];
        this.tweetsLimit = 0;
        this.usersLimit = 0;
    }

}

export default new SearchStore();