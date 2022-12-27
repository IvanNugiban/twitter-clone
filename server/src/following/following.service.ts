import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {UserDto} from "../auth/dto/user-dto";
import {IUser} from "../auth/interfaces/UserInterface";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {FollowingModel} from "./entities/following.model";
import {FollowingDto} from "./dto/following-dto";
import {FollowerDto} from "./dto/follower-dto";

@Injectable()
export class FollowingService {

    constructor(@InjectModel("User") private userSchema: Model<IUser>, @InjectModel("Following") private followingSchema: Model<FollowingModel>) {
    }

    private isUserFollowing(userWhoLoggedIn, followingUserData, user) {
        let isUserFollowing;


        if (userWhoLoggedIn.pseudonym !== user.pseudonym) followingUserData.followers.find(pseudonym => {
            if (pseudonym === userWhoLoggedIn.pseudonym) {
                isUserFollowing = true;
                return true;
            }
        })
        return isUserFollowing;
    }

    private async findByPseudonym(pseudonym: string) {
        const possibleUser: IUser | undefined = await this.userSchema.findOne({pseudonym})
        if (!possibleUser) throw new HttpException("User not found", HttpStatus.NOT_FOUND)
        return possibleUser;
    }

    private async getFollower(pseudonym: string, userWhoLoggedIn: UserDto) {
    const searchedUser = await this.findByPseudonym(pseudonym);
    const userFollowingData = await this.followingSchema.findOne({userRef: searchedUser._id});

    const isUserFollowing = this.isUserFollowing(userWhoLoggedIn, userFollowingData, searchedUser);

    return new FollowerDto(searchedUser, isUserFollowing)
    }

    async getFollowingData(pseudonym: string, userWhoLoggedIn: UserDto) {
        const user = await this.findByPseudonym(pseudonym);
        const followingUserData = await this.followingSchema.findOne({userRef: user._id});
        const isUserFollowing = this.isUserFollowing(userWhoLoggedIn, followingUserData, user)

        return new FollowingDto(followingUserData, isUserFollowing);
    }

    async getFollowing(pseudonym: string, userWhoLoggedIn: UserDto) {
        const user = await this.findByPseudonym(pseudonym);
        const followingUserData = await this.followingSchema.findOne({userRef: user._id});

        return await Promise.all(followingUserData.following.map(async (pseudonym) => await this.getFollower(pseudonym, userWhoLoggedIn)));
    }

    async getFollowers(pseudonym: string, userWhoLoggedIn: UserDto) {
        const user = await this.findByPseudonym(pseudonym);
        const followersUserData = await this.followingSchema.findOne({userRef: user._id});

        return await Promise.all(followersUserData.followers.map(async (pseudonym) => await this.getFollower(pseudonym, userWhoLoggedIn)));
    }

    async follow(pseudonym: string, user: UserDto, isUserFollowing) {
        const userToFollow = await this.findByPseudonym(pseudonym);
        const userWhoFollowsData = await this.followingSchema.findOne({userRef: user.id})
        const followingUserData = await this.followingSchema.findOne({userRef: userToFollow._id});


        if (isUserFollowing) throw new HttpException("You are already followed", HttpStatus.METHOD_NOT_ALLOWED)

        userWhoFollowsData.following.push(userToFollow.pseudonym);
        userWhoFollowsData.followingAmount += 1;

        followingUserData.followers.push(user.pseudonym);
        followingUserData.followersAmount += 1;
        await followingUserData.save();
        await userWhoFollowsData.save();

        return true;
    }

    async unfollow(pseudonym: string, user: UserDto) {
        const userToUnfollow = await this.findByPseudonym(pseudonym);
        const userWhoUnfollowsData = await this.followingSchema.findOne({userRef: user.id});
        const followingUserData = await this.followingSchema.findOne({userRef: userToUnfollow._id});
        const userWhoUnfollows = followingUserData.followers.indexOf(user.pseudonym);
        const userWhoBeingUnfollowed  = userWhoUnfollowsData.following.indexOf(pseudonym);

        userWhoUnfollowsData.following.splice(userWhoBeingUnfollowed, 1);
        userWhoUnfollowsData.followingAmount -= 1;

        followingUserData.followers.splice(userWhoUnfollows, 1);
        followingUserData.followersAmount -= 1;
        await followingUserData.save();
        await userWhoUnfollowsData.save();
        return true;
    }

}
