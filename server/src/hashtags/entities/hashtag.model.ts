import {Field, ObjectType} from "@nestjs/graphql";


@ObjectType("HashtagModel")

export class HashtagModel {
    @Field({description: "Hashtag name"})
    hashtag: string;
    @Field({description: "Number of tweets with this hashtag"})
    numberOfTweets: number;
    @Field(type => [String], {description: "Tweets with this hashtag"})
    tweets: string[];
}