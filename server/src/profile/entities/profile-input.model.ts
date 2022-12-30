import {Field, InputType} from "@nestjs/graphql";
import {IsString, Matches, MaxLength, MinLength, ValidateIf} from "class-validator";

@InputType({description: "Profile"})
export class ProfileInputModel {
    @IsString()
    @MinLength(4, {
        message: "Username must be at least 4 characters long"
    })
    @MaxLength(16, {
        message: "Maximum length of username - 16"
    })
    @Field({description: "Username"})
    username: string;
    @Field({nullable: true, description: "Description"})
    description?: string;
    @Field({description: "Website", nullable: true})
    website?: string;
    @Field({description: "Birthday"})
    birthday: string;
    @Field( {nullable: true, description: "Avatar"})
    avatar?: string
    @Field({nullable: true, description: "Profile background"})
    profileBackground?: string

}