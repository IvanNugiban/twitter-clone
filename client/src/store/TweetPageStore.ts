import {makeAutoObservable} from "mobx";
import {IComment} from "../types/interfaces/IComment";


class TweetPageStore {

    comments: IComment[] = [];
    initialLimit = 15;
    commentsLimit = 0;

    constructor() {
        makeAutoObservable(this)
    }

    setComments(comments: IComment[]) {
        this.comments = this.comments = [...this.comments, ...comments].filter((v, i, a) => a.findIndex(v2 => (v2.id === v.id)) === i);
    }

    increaseLimit() {
        this.commentsLimit += this.initialLimit;
    }

    reset() {
        this.comments = [];
        this.commentsLimit = 0;
    }

}

export default new TweetPageStore();