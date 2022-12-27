import {Field, ID, InputType, ObjectType} from "@nestjs/graphql";


@InputType("Tweet",{description: "Tweet input"})

export class TweetInputModel {
    @Field({description: "Tweet text", nullable: true})
    text?: string;
    @Field(type => [String], {description: "Tweet media", nullable: true})
    media?: string[]
    @Field(type => String, {description: "Tweet gif", nullable: true})
    gif?: string
    @Field( {description: "Date when tweet created"})
    createdAt: string;
}