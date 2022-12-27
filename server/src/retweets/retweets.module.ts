import {Module} from '@nestjs/common';
import {RetweetsService} from './retweets.service';
import {RetweetsResolver} from './retweets.resolver';
import {MongooseModule} from "@nestjs/mongoose";
import RetweetsSchema from "./schemas/retweets.schema";
import TokenSchema from "../tokens/token.schema";
import {TokensService} from "../tokens/tokens.service";

@Module({
  imports: [MongooseModule.forFeature([{
    name: "Retweets",
    schema: RetweetsSchema
  }, {
    name: "Token",
    schema: TokenSchema
  }])],
  providers: [RetweetsService, RetweetsResolver, TokensService],
  exports: [RetweetsService]
})
export class RetweetsModule {}
