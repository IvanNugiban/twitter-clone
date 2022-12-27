import {Field, ObjectType} from "@nestjs/graphql";
import {UserModel} from "../../user/entities/user.model";
import {HashtagModel} from "../../hashtags/entities/hashtag.model";


@ObjectType("SearchForResults")
export class SearchForResultsModel {
    @Field(type => [HashtagModel],{nullable: true, description: "Result of search"})
    hashtags: HashtagModel[]
    @Field(type => [UserModel],{nullable: true, description: "Result of search"})
    users: UserModel[]
}