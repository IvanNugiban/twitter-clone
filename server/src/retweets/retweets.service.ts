import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {RetweetModel} from "./entities/retweet.model";

@Injectable()
export class RetweetsService {

    constructor(@InjectModel("Retweets") private retweetsModel: Model<RetweetModel>) {
    }

    async retweet(tweetId: string, userId: string) {
        const possibleRetweet = await this.retweetsModel.findOne({tweetRef: tweetId, userRef: userId});
        if (possibleRetweet) {
            return this.retweetsModel.findOneAndDelete({tweetRef: tweetId, userRef: userId})
        }
        return this.retweetsModel.create({tweetRef: tweetId, userRef: userId});
    }

    async getRetweetsAmount(tweetId: string) {
        const allRetweets = await this.retweetsModel.find({tweetRef: tweetId});
        return allRetweets.length;
    }

    async getAllRetweets(userId: string) {
        return this.retweetsModel.find({userRef: userId})
    }

    async isUserRetweeted(tweetId: string, userId: string) {
        const allRetweetsOfTweet = await this.retweetsModel.find({tweetRef: tweetId});
        return allRetweetsOfTweet.find((item) => item.userRef === userId);
    }

}
