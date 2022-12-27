import {Field, ObjectType} from "@nestjs/graphql";


@ObjectType("User")
export class UserModel {
    @Field({description: "Username"})
    username: string;
    @Field({description: "Pseudonym"})
    pseudonym: string;
    @Field({description: "Date of joining"})
    dateOfJoining: string;
    @Field({description: "Description", nullable: true})
    description?: string;
    @Field({description: "Website", nullable: true})
    website?: string
    @Field({description: "Avatar", nullable: true})
    avatar?: string
    @Field({description: "Profile background", nullable: true})
    profileBackground?: string
}