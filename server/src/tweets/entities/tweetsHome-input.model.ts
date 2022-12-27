import {Field, InputType} from "@nestjs/graphql";

@InputType("HomeTweets")
export class TweetsHomeInputModel {
    @Field({description : "Tweets limit"})
    limit: number;
    @Field({description: "Type of search"})
    typeOfSearch: "latest" | "top";
    @Field({description: "Initial limit"})
    initialLimit: number;
}

