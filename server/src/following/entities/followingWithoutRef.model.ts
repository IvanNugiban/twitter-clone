import {Field, ObjectType} from "@nestjs/graphql";


@ObjectType({description: "Followers and following"})
export class FollowingWithoutRefModel {
    @Field({description: "Followers amount", defaultValue: 0})
    followersAmount: number;
    @Field(type => [String],{description: "All following", defaultValue: []})
    @Field({description: "Following amount", defaultValue: 0})
    followingAmount: number;
    @Field({description: "Is user following"})
    isUserFollowing: boolean
}