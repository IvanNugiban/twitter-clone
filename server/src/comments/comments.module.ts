import {Module} from '@nestjs/common';
import {CommentsResolver} from './comments.resolver';
import {CommentsService} from './comments.service';
import {MongooseModule} from "@nestjs/mongoose";
import CommentsSchema from "./schemas/comments.schema";
import {TokensService} from "../tokens/tokens.service";
import TokenSchema from "../tokens/token.schema";

@Module({
    imports: [MongooseModule.forFeature([{
        name: "Comments",
        schema: CommentsSchema
    }, {
        name: "Token",
        schema: TokenSchema
    }])],
    providers: [CommentsResolver, CommentsService, TokensService],
    exports: [CommentsService]
})
export class CommentsModule {
}
