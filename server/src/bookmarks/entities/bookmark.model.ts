import {Field, ID, ObjectType} from "@nestjs/graphql";


@ObjectType("Bookmarks")
export class BookmarkModel {
    @Field(type => ID,{description: "User, who bookmarked tweet ref"})
    userRef: string;
    @Field(type => ID,{description: "Bookmarked tweet ref"})
    tweetRef: string;
}