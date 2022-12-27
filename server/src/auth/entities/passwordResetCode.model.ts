import {Field, InputType, ObjectType} from "@nestjs/graphql";
import {IsNumber, Max, Min} from "class-validator";
import {userModel} from "./user.model";

@InputType()
export class PasswordResetCodeModel {

    @Field({description: "User email"})
    userEmail: string

    @IsNumber()
    @Min(100000, {message: "Code must be 6 characters long"})
    @Max(999999, {message: "Code must be 6 characters long"})
    @Field({description: "Verification code"})
    code: number;

}