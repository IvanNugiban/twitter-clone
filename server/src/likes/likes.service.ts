import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {LikesModel} from "./entities/likes.model";

@Injectable()
export class LikesService {

    constructor(@InjectModel("Likes") private likesSchema: Model<LikesModel>) {
    }

    async getTweetLikes(tweetRef: string) {
    const allLikes = await this.likesSchema.find({tweetRef});
    return allLikes.length;
    }

    async getAllLikedTweets(userId) {
        return this.likesSchema.find({userRef: userId});
    }

    async likeTweet(userId: string, tweetRef: string) {
        const possibleLike = await this.likesSchema.findOne({userRef: userId, tweetRef});
        if (possibleLike) {
            return this.likesSchema.findOneAndDelete({userRef: userId, tweetRef});
        }
        return this.likesSchema.create({userRef: userId, tweetRef});
    }

    async isUserLiked(tweetId : string, userId: string) {
        const tweetLikes = await this.likesSchema.find({tweetRef: tweetId});
        return tweetLikes.find((element) => element.userRef === userId);
    }

}
