import {makeAutoObservable} from "mobx";
import {ITweet} from "../types/interfaces/ITweet";



class ExploreStore {

    tweets: ITweet[] = [];
    initialLimit = 15;
    limit: number = 0;
    scrollPosition: number = 0;

    constructor() {
        makeAutoObservable(this)
    }

    setTweets(tweets : ITweet[]) {
        this.tweets = [...this.tweets, ...tweets].filter((v, i, a) => a.findIndex(v2 => (v2.id === v.id)) === i) ;
    }

    increaseLimit() {
        this.limit += this.initialLimit;
    }

    setScrollPosition(scrollPosition: number) {
        this.scrollPosition = scrollPosition;
    }

    reset() {
        this.scrollPosition = 0;
        this.limit = 0;
        this.tweets = [];
    }

}

export default new ExploreStore();