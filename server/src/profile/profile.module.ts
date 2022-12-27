import {Module} from '@nestjs/common';
import {ProfileResolver} from "./profile.resolver";
import {ProfileService} from "./profile.service";
import {MongooseModule} from "@nestjs/mongoose";
import User from "../auth/schemas/auth.schema";
import {FilesModule} from "../files/files.module";
import {FilesService} from "../files/files.service";
import {TokensService} from "../tokens/tokens.service";
import {TokensModule} from "../tokens/tokens.module";
import TokenSchema from "../tokens/token.schema";

@Module({
    imports: [MongooseModule.forFeature([{
        name: "User",
        schema: User
    }, {name: "Token", schema: TokenSchema}]), FilesModule],
    providers: [ProfileResolver, ProfileService, FilesService, TokensService]
})
export class ProfileModule {}
