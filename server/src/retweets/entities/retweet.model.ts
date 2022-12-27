import {Field, ID, ObjectType} from "@nestjs/graphql";


@ObjectType("Retweets")
export class RetweetModel {
    @Field(type => ID,{description: "Retweeted user ref"})
    userRef: string;
    @Field(type => ID,{description: "Retweeted tweet ref"})
    tweetRef: string;
}