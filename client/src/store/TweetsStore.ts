import {makeAutoObservable} from "mobx";
import {ITweet} from "../types/interfaces/ITweet";

type tweetSort = "top" | "latest";

class TweetsStore {

    tweets: ITweet[] = [];
    initialLimit = 15;
    limit: number = 0;
    tweetSortType : tweetSort = "latest";
    scrollPosition: number = 0;

    constructor() {
        makeAutoObservable(this)
    }

     setTweets(tweets : ITweet[]) {
        this.tweets = [...this.tweets, ...tweets].filter((v, i, a) => a.findIndex(v2 => (v2.id === v.id)) === i) ;
    }

    setNewTweets(tweets : ITweet[]) {
    this.tweets = tweets;
    this.limit = 0;
    this.scrollPosition = 0;
    }

    setTypeOfTweetSorting(sortType: tweetSort) {
        this.tweetSortType = sortType;
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
        this.tweetSortType = "latest";
    }


}

export default new TweetsStore();