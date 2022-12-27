import {Schema} from "mongoose";
import {LikesModel} from "../entities/likes.model";

const Likes = new Schema<LikesModel>({
    userRef: String,
    tweetRef: String
})

export default Likes;