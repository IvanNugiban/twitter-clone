import {Field, InputType} from "@nestjs/graphql";

@InputType("UserSearch")

export class UsersSearchInputModel {
    @Field(  {description: "Search request"})
    searchRequest: string;
    @Field({description : "Tweets limit"})
    limit: number;
    @Field({description: "Initial limit"})
    initialLimit: number;
}

