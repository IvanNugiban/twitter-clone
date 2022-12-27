import {Field, ObjectType} from "@nestjs/graphql";
import {UserModel} from "./user.model";


@ObjectType("UserSearchOutput")
export class UserSearchOutputModel {
    @Field(type => [UserModel],{description: "Users"})
    users: UserModel[]
    @Field({description: "Has more users?"})
    hasMore: boolean;
}