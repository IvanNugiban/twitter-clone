import {Field, ObjectType} from "@nestjs/graphql";


@ObjectType({description: "Profile"})
export class ProfileModel {
    @Field({description: "Username"})
    username: string;
    @Field({nullable: true, description: "Description"})
    description?: string;
    @Field({nullable: true, description: "Website"})
    website?: string;
    @Field({description: "Birthday"})
    birthday: string;
    @Field({nullable: true, description: "Avatar"})
    avatar?: string;
    @Field({nullable: true, description: "Profile background"})
    profileBackground?: string;
}