import {FollowingModel} from "../entities/following.model";


export class FollowingDto {
    followingAmount: number;
    followersAmount: number;
    following: string[];
    followers: string[]
    isUserFollowing: boolean;

    constructor(followingData: FollowingModel, isUserFollowing: boolean = false) {
        this.followingAmount = followingData.followingAmount;
        this.followersAmount = followingData.followersAmount;
        this.following = followingData.following;
        this.followers = followingData.followers;
        this.isUserFollowing = isUserFollowing;
    }

}