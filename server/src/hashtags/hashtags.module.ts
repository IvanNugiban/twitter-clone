import { Module } from '@nestjs/common';
import { HashtagsService } from './hashtags.service';
import { HashtagsResolver } from './hashtags.resolver';
import {MongooseModule} from "@nestjs/mongoose";
import HashtagSchema from "./schemas/hashtag.schema";

@Module({
  imports: [MongooseModule.forFeature([{
    name: "Hashtag",
    schema: HashtagSchema
  }])],
  providers: [HashtagsService, HashtagsResolver],
  exports: [HashtagsService]
})
export class HashtagsModule {}
