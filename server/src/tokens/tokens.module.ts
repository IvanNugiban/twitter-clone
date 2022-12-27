import { Module } from '@nestjs/common';
import { TokensService } from './tokens.service';
import {MongooseModule} from "@nestjs/mongoose";
import TokenSchema from "./token.schema";

@Module({
  imports: [MongooseModule.forFeature([{name: "Token", schema: TokenSchema}])],
  exports: [TokensService],
  providers: [TokensService]
})
export class TokensModule {}
