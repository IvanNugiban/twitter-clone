import {makeAutoObservable} from "mobx";
import {ITweet} from "../types/interfaces/ITweet";


class BookmarksStore {

    bookmarks : ITweet[] = [];
    limit: number = 0;
    initialLimit: number = 15;

    constructor() {
        makeAutoObservable(this)
    }

    setBookmarks(tweets : ITweet[]) {
        this.bookmarks = [...this.bookmarks, ...tweets].filter((v, i, a) => a.findIndex(v2 => (v2.id === v.id)) === i) ;
    }

    increaseLimit() {
        this.limit += this.initialLimit;
    }

    reset() {
        this.limit = 0;
        this.bookmarks = [];
    }
}

export default new BookmarksStore();