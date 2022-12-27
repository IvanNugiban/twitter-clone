import {TweetModel} from "../entities/tweet.model";

class TweetDto implements TweetModel {
    id = "";
    userRef = "";
    text = "";
    media = [];
    gif = undefined;
    createdAt = "";

    constructor(tweetData: TweetModel, tweetId) {
        this.userRef = tweetData.userRef;
        this.text = tweetData.text;
        this.media = tweetData.media;
        this.gif = tweetData.gif;
        this.createdAt = tweetData.createdAt;
        this.id = tweetId;
    }
}

export default TweetDto;