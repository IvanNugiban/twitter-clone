import {Module} from '@nestjs/common';
import {SearchService} from './search.service';
import {SearchResolver} from './search.resolver';
import {TokensService} from "../tokens/tokens.service";
import {MongooseModule} from "@nestjs/mongoose";
import TokenSchema from "../tokens/token.schema";
import AuthSchema from "../auth/schemas/auth.schema";
import HashtagSchema from "../hashtags/schemas/hashtag.schema";
import {HashtagsService} from "../hashtags/hashtags.service";
import {UserService} from "../user/user.service";
import TweetSchema from "../tweets/schemas/tweet.schema";

@Module({
    imports: [MongooseModule.forFeature([{
        name: "Token",
        schema: TokenSchema
    }, {
        name: "User",
        schema: AuthSchema
    }, {
        name: "Hashtag",
        schema: HashtagSchema
    }, {
        name: "Tweet",
        schema: TweetSchema
    }])],
    providers: [HashtagsService ,SearchService, SearchResolver, TokensService, UserService],
    exports: [SearchService]
})
export class SearchModule {}
