import {IUser} from "../../auth/interfaces/UserInterface";
import {FollowerModel} from "../entities/follower.model";


export class FollowerDto implements FollowerModel{
    avatar = "";
    username = "";
    pseudonym = "";
    description = undefined;
    isFollowing = false;

    constructor(user: IUser, isUserFollowing: boolean = false) {
       this.avatar = user.avatar;
       this.username = user.username;
       this.pseudonym = user.pseudonym;
       this.description = user.description;
       this.isFollowing = isUserFollowing;
    }

}