import {Schema} from "mongoose";


export const RetweetsSchema = new Schema({
    userRef: String,
    tweetRef: String
})

export default RetweetsSchema;