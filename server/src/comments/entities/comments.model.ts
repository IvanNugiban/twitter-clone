import {Field, ID, ObjectType} from "@nestjs/graphql";


@ObjectType("Comments")
export class CommentsModel {
    @Field(type => ID,{description: "Tweet id"})
    id: string;
    @Field(type => ID, {description: "User reference"})
    userRef: string;
    @Field(type => ID, {description: "Tweet reference"})
    tweetRef: string;
    @Field({description: "Tweet text", nullable: true})
    text?: string;
    @Field(type => [String], {description: "Tweet media", nullable: true})
    media?: string[]
    @Field(type => String, {description: "Tweet gif", nullable: true})
    gif?: string
    @Field(type => String, {description: "Date when tweet created"})
    createdAt: string;
}