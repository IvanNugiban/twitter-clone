import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import {MongooseModule} from "@nestjs/mongoose";
import User from "../auth/schemas/auth.schema";

@Module({
  imports: [MongooseModule.forFeature([{
    name: "User",
    schema: User
  }])],
  providers: [UserService, UserResolver],
  exports: [UserService]
})
export class UserModule {}
