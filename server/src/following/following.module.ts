import {Module} from '@nestjs/common';
import {FollowingResolver} from './following.resolver';
import {FollowingService} from './following.service';
import {TokensService} from "../tokens/tokens.service";
import {MongooseModule} from "@nestjs/mongoose";
import User from "../auth/schemas/auth.schema";
import TokenSchema from "../tokens/token.schema";
import FollowingSchema from "./schemas/following.schema";

@Module({
  imports: [ MongooseModule.forFeature([{
    name: "User",
    schema: User
  }, {name: "Token", schema: TokenSchema}, {name: "Following", schema: FollowingSchema}])],
  providers: [FollowingResolver, FollowingService, TokensService],
  exports: [FollowingService]
})
export class FollowingModule {}
