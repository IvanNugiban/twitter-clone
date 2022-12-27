import {Module} from '@nestjs/common';
import {LikesService} from './likes.service';
import {LikesResolver} from './likes.resolver';
import {MongooseModule} from "@nestjs/mongoose";
import LikesSchema from "./schemas/likes.schema";
import TokenSchema from "../tokens/token.schema";
import {TokensService} from "../tokens/tokens.service";

@Module({
    imports: [MongooseModule.forFeature([{
        name: "Likes",
        schema: LikesSchema
    }, {
        name: "Token",
        schema: TokenSchema
    }])],
    providers: [LikesService, LikesResolver, TokensService],
    exports: [LikesService]
})
export class LikesModule {
}
