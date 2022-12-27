import {Field, ObjectType} from "@nestjs/graphql";


@ObjectType("TweetCommunication")
export class TweetCommunicateModel {
    @Field({description: "Likes"})
    likes: number;
    @Field({description: "Is user liked"})
    isUserLiked: boolean;
    @Field({description: "Comments"})
    comments: number;
    @Field({description: "Retweets"})
    retweets: number;
    @Field({description: "Is user retweeted"})
    isUserRetweeted: boolean;
    @Field({description: "Is user added tweet to bookmarks.ts"})
    isTweetBookmarked: boolean;
}