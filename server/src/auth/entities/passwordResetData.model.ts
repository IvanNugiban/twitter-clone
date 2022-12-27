import {Field, InputType} from "@nestjs/graphql";
import {IsString, MaxLength, MinLength} from "class-validator";

@InputType("PasswordResetData")
export class PasswordResetDataModel {
    @IsString()
    @MinLength(4, {message: "Password must be longer than or equal to 4 characters "})
    @MaxLength(25, {message: "Password must be shorter than or equal to 25 characters"})
    @Field({description: "Password"})
    password: string

    @Field({description: "User email"})
    userEmail: string;
}