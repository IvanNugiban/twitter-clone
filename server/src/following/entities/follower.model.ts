import {Field, ObjectType} from "@nestjs/graphql";


@ObjectType({description: "Follower"})
export class FollowerModel {
    @Field({description: "Avatar", nullable: true})
    avatar?: string;
    @Field({description: "Username"})
    username: string;
    @Field({description: "Pseudonym"})
    pseudonym: string;
    @Field({description: "Avatar", nullable: true})
    description?: string;
    @Field({description: "Is user following"})
    isFollowing: boolean;
}