import {Schema} from "mongoose";


export const BookmarkSchema = new Schema({
    userRef: String,
    tweetRef: String
})

export default BookmarkSchema;