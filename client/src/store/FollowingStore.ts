import {IFollowing} from "../types/interfaces/IFollowing";
import {makeAutoObservable} from "mobx";


class FollowingStore implements IFollowing{
followers = [];
following = [];
followingAmount = 0;
followersAmount = 0;
isUserFollowing = false;
refetch = (() => undefined) as () => void;

constructor() {
    makeAutoObservable(this);
}

setFollowingAndFollowersAmount(data : {
    followingAmount: number,
    followersAmount: number,
    isUserFollowing: boolean
}, refetch : () => void) {
    this.followingAmount = data.followingAmount;
    this.followersAmount = data.followersAmount;
    this.isUserFollowing = data.isUserFollowing;
    this.refetch = refetch;
}

reset() {
    this.followers = [];
    this.following = [];
    this.followingAmount = 0;
    this.followersAmount = 0;
    this.isUserFollowing = false;
}

}

export default new FollowingStore();