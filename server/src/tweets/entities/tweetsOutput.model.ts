import {Field, ObjectType} from "@nestjs/graphql";
import {TweetModel} from "./tweet.model";

@ObjectType({description: "TweetOutput"})

export class TweetsOutputModel {
    @Field(type => [TweetModel],{description: "Tweets"})
    tweets: TweetModel[]
    @Field({description: "Has more tweets?"})
    hasMore: boolean;
}