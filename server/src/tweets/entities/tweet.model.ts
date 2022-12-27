import {Field, ID, ObjectType} from "@nestjs/graphql";

@ObjectType({description: "Tweet model"})

export class TweetModel {
    @Field(type => ID,{description: "Tweet id"})
    id: string;
    @Field({description: "User reference"})
    userRef: string;
    @Field({description: "Tweet text", nullable: true})
    text?: string;
    @Field(type => [String], {description: "Tweet media", nullable: true})
    media?: string[]
    @Field(type => String, {description: "Tweet gif", nullable: true})
    gif?: string
    @Field(type => String, {description: "Date when tweet created"})
    createdAt: string;
}