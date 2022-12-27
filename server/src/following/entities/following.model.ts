import {Field, ID, ObjectType} from "@nestjs/graphql";


@ObjectType({description: "Followers and following"})
export class FollowingModel {
    @Field(type => ID,{description: "User id"})
    userRef: string
    @Field(type => [String],{description: "All followers", defaultValue: []})
    followers: string[]
    @Field({description: "Followers amount", defaultValue: 0})
    followersAmount: number;
    @Field(type => [String],{description: "All following", defaultValue: []})
    following: string[]
    @Field({description: "Following amount", defaultValue: 0})
    followingAmount: number;
    @Field({description: "Is user following"})
    isUserFollowing: boolean
}