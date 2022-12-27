import {Field, InputType} from "@nestjs/graphql";

@InputType("TweetSearch")

export class TweetSearchInputModel {
    @Field(  {description: "Search request"})
    searchRequest: string;
    @Field({description : "Tweets limit"})
    limit: number;
    @Field({description: "Initial limit"})
    initialLimit: number;
}

