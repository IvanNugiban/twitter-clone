import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model, Document, Types} from "mongoose";
import {HashtagModel} from "./entities/hashtag.model";

@Injectable()
export class HashtagsService {

    constructor(@InjectModel("Hashtag") private hashtagSchema: Model<HashtagModel>) {
    }

    async getSearchedHashtags(hashtag: string) {
        return this.hashtagSchema.find({ "hashtag": { "$regex": hashtag, "$options": "i" } })
    }

    async addTweetToHashtag(hashtags: RegExpMatchArray, id: string) {
        return Promise.all(hashtags.map(async (hashtagFromTweet) => {
            const possibleHashtag = await this.hashtagSchema.findOne({hashtag: hashtagFromTweet});
            let hashtag: Document<unknown, any, HashtagModel> & HashtagModel & { _id: Types.ObjectId };
            if (possibleHashtag) hashtag = possibleHashtag;
            else hashtag = await this.hashtagSchema.create({hashtag: hashtagFromTweet, numberOfTweets: 0, tweets: []});
            hashtag.numberOfTweets += 1;
            hashtag.tweets.push(id);
            hashtag.save();
        }))
    }

    async removeTweetFromHashtag(hashtags: RegExpMatchArray, tweetId: string) {
        return Promise.all(hashtags.map(async (hashtagFromTweet) => {
            const hashtag = await this.hashtagSchema.findOne({hashtag: hashtagFromTweet});
            if (hashtag.numberOfTweets === 1) return hashtag.remove();
            hashtag.numberOfTweets -= 1;
            hashtag.tweets.filter(tweetIdFromDb => tweetIdFromDb !== tweetId)
        }))
    }

    async getRandomHashtags() {
        const allHashtags = await this.hashtagSchema.find();
        const sortedHashtags = allHashtags.sort(() => 0.5 - Math.random());
        return sortedHashtags.slice(0, 10);
    }
}
