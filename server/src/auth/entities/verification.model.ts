import {Field, InputType, ObjectType} from "@nestjs/graphql";
import {IsNumber, Max, Min} from "class-validator";
import {userModel} from "./user.model";

@ObjectType({description: "Verification data"})
@InputType()
export class VerificationModel {

    @Field({description: "User data"})
    user: userModel

    @IsNumber()
    @Min(100000, {message: "Code must be 6 characters long"})
    @Max(999999, {message: "Code must be 6 characters long"})
    @Field({description: "Verification code"})
    code: number;

}