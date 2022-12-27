import {Schema} from "mongoose";

const HashtagSchema = new Schema({
    hashtag: String,
    numberOfTweets: Number,
    tweets: [String]
})


export default HashtagSchema;