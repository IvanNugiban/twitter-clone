import {Field, InputType} from "@nestjs/graphql";

@InputType("TweetsLimit")

export class TweetsLimitInputModel {
    @Field(  {description: "User id"})
    userPseudonym: string;
    @Field({description : "Tweets limit"})
    limit: number;
    @Field({description: "Initial limit"})
    initialLimit: number;
}

