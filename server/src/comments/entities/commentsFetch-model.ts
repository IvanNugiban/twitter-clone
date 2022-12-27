import {Field, InputType} from "@nestjs/graphql";

@InputType("commentFetch")
export class CommentsFetchModel {
    @Field({description: "Tweet id"})
    tweetId: string;
    @Field({description: "Comments limit"})
    limit: number;
    @Field({description: "Initial limit"})
    initialLimit: number;
}