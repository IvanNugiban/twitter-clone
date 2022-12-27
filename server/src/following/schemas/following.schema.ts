import {Schema} from "mongoose";
import {FollowingModel} from "../entities/following.model";

const Following = new Schema<FollowingModel>({
    userRef: {type: String, required: true},
    followers: {type:  [String], required: true, default: []},
    followersAmount: {type: Number, required: true, default: 0},
    following: {type:  [String], required: true, default: []},
    followingAmount: {type: Number, required: true, default: 0},
})


export default Following;