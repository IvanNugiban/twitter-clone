import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthResolver} from "./auth.resolver";
import {MongooseModule} from "@nestjs/mongoose";
import User from "./schemas/auth.schema";
import {TokensModule} from "../tokens/tokens.module";
import {EmailService} from "../email/email.service";
import Verification from "./schemas/verification.schema";
import FollowingSchema from "../following/schemas/following.schema";

@Module({
    imports: [MongooseModule.forFeature([{
        name: "User",
        schema: User
    }, {name: "Verification", schema: Verification}, {name: "Following", schema: FollowingSchema}]), TokensModule],
    providers: [AuthService, AuthResolver, EmailService],
})
export class AuthModule {
}
