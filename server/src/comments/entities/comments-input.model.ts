import {Field, ID, InputType} from "@nestjs/graphql";


@InputType("CommentsInput")

export class CommentsInputModel {
    @Field(type => ID, {description: "Comment reference"})
    tweetRef: string;
    @Field({description: "Comment text", nullable: true})
    text?: string;
    @Field(type => [String], {description: "Comment media", nullable: true})
    media?: string[]
    @Field(type => String, {description: "Comment gif", nullable: true})
    gif?: string
    @Field( {description: "Date when comment created"})
    createdAt: string;
}