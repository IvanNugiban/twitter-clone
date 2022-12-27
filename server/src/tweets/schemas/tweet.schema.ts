import {Schema} from "mongoose";
import {TweetModel} from "../entities/tweet.model";


const Tweet = new Schema<TweetModel>({
    userRef: String,
    text: {type: String, required: false},
    media: {type: [String], required: false},
    gif: {type: String, required: false},
    createdAt: String
})

export default Tweet;