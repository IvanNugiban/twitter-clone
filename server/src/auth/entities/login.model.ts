import {Field, ObjectType} from "@nestjs/graphql";



@ObjectType({description: "Auth"})
export class LoginModel {
    @Field({description: "Username"})
    username: string;
    @Field({description: "Email"})
    email: string;
    @Field({description: "Pseudonym"})
    pseudonym: string;
    @Field({description: "Date of joining"})
    dateOfJoining: string;
    @Field({description: "Description", nullable: true})
    description?: string;
    @Field({description: "Birthday"})
    birthday: string;
    @Field({description: "Avatar", nullable: true})
    avatar?: string
    @Field({description: "Profile background", nullable: true})
    profileBackground?: string
    @Field({description: "Website", nullable: true})
    website?: string
    @Field(type => [String],{description: "Bookmarks"})
    bookmarks: string[]
    @Field(type => [String], {description: "Likes"})
    likes: string[]
    @Field({description: "Access token"})
    accessToken: string;
    @Field({description: "Font size level", nullable: true})
    fontSizeLevel?: string;
    @Field({description: "Main color", nullable: true})
    color?: string;
    @Field({description: "App theme", nullable: true})
    theme?: string;
}