import {makeAutoObservable} from "mobx";
import {ITweet} from "../types/interfaces/ITweet";


class ProfileTweetsStore {

    tweets: ITweet[] = [];
    retweets : ITweet[] = [];
    tweetsWithMedia : ITweet[] = [];
    likedTweets : ITweet[] = [];
    initialLimit = 15;
    limit = 0;
    retweetsLimit = 0;
    tweetsWithMediaLimit = 0;
    likedTweetsLimit = 0;

    constructor() {
        makeAutoObservable(this);
    }

    setTweets(tweets : ITweet[]) {
        this.tweets = [...this.tweets, ...tweets].filter((v, i, a) => a.findIndex(v2 => (v2.id === v.id)) === i) ;
    }

    setRetweets(retweets : ITweet[]) {
        this.retweets = [...this.retweets, ...retweets].filter((v, i, a) => a.findIndex(v2 => (v2.id === v.id)) === i) ;
    }

    setTweetsWithMedia(tweets : ITweet[]) {
        this.tweetsWithMedia = [...this.tweetsWithMedia, ...tweets].filter((v, i, a) => a.findIndex(v2 => (v2.id === v.id)) === i) ;
    }

    setLikedTweets(tweets : ITweet[]) {
        this.likedTweets = [...this.likedTweets, ...tweets].filter((v, i, a) => a.findIndex(v2 => (v2.id === v.id)) === i) ;
    }

    increaseLimit() {
        this.limit += this.initialLimit;
    }

    increaseRetweetsLimit () {
        this.retweetsLimit += this.initialLimit;
    }

    increaseTweetsWithMediaLimit() {
        this.tweetsWithMediaLimit += this.initialLimit;
    }

    increaseLikedTweetsLimit() {
        this.likedTweetsLimit += this.initialLimit;
    }

    reset() {
        this.tweets = [];
        this.retweets  = [];
        this.tweetsWithMedia  = [];
        this.likedTweets = [];
        this.limit = 0;
        this.retweetsLimit = 0;
        this.tweetsWithMediaLimit = 0;
        this.likedTweetsLimit = 0;
    }

}

export default new ProfileTweetsStore();