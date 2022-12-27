import {Field, ObjectType} from "@nestjs/graphql";

@ObjectType("Likes")
export class LikesModel {
    @Field({description: "Reference of tweet"})
    tweetRef: string
    @Field({description: "User ref"})
    userRef: string;
}