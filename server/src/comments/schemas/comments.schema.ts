import {Schema} from "mongoose";


const CommentsSchema = new Schema({
    id: String,
    userRef: String,
    tweetRef: String,
    text: {type: String, required: false},
    media: [String],
    gif: {type : String, required: false},
    createdAt: String
})
export default CommentsSchema;