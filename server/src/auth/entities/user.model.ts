import {Field, InputType, ObjectType} from "@nestjs/graphql";
import {IsEmail, IsString, Matches, MaxLength, MinLength, ValidateIf} from "class-validator";


@ObjectType({description: "Auth"})
@InputType("UserInput")
export class userModel {

    @IsString()
    @MinLength(4, {
        message: "Username must be at least 4 characters long"
    })
    @MaxLength(16, {
        message: "Maximum length of username - 16"
    })
    @Field({description: "Username"})
    username: string;

    @IsString()
    @MinLength(4, {
        message: "Pseudonym must be at least 4 characters long"
    })
    @MaxLength(16, {
        message: "Maximum length of pseudonym - 16"
    })
    @Matches(/^[a-zA-Z\d-_]+$/, {message: "Pseudonym can contain only numbers, and latin letters and -, _ symbols"})
    @Field({description: "Pseudonym"})
    pseudonym: string;

    @IsEmail(undefined, {
        message: "Please make sure you entered the correct email"
    })
    @Field({description: "Email"})
    email: string;


    @IsString()
    @MinLength(4, {message: "Password must be longer than or equal to 4 characters "})
    @MaxLength(25, {message: "Password must be shorter than or equal to 25 characters"})
    @Field({description: "Password"})
    password: string

    @Field({description: "Date of joining", nullable: true})
    dateOfJoining?: string;

    @IsString()
    @MinLength(1, {message: "Enter your birthday"})
    @Field({description: "Birthday"})
    birthday: string;

}