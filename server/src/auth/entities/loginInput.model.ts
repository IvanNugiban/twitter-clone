import {Field, InputType} from "@nestjs/graphql";
import {IsString, Length} from "class-validator";

@InputType("LoginType")
export class LoginInputModel {
    @IsString()
    @Length(1, 100, {message: "Minimum number of characters - 1, maximum - 100"})
    @Field({description: "Email or username"})
    emailOrUsername: string;
    @IsString()
    @Length(4, 50, {message: "Minimum number of characters - 4, maximum - 50"})
    @Field({description: "Password"})
    password: string;
}