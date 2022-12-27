import { Module } from '@nestjs/common';
import { BookmarksService } from './bookmarks.service';
import { BookmarksResolver } from './bookmarks.resolver';
import {MongooseModule} from "@nestjs/mongoose";
import BookmarkSchema from "./schemas/bookmark.schema";
import {TokensService} from "../tokens/tokens.service";
import TokenSchema from "../tokens/token.schema";

@Module({
  imports: [MongooseModule.forFeature([{
    name: "Bookmark",
    schema: BookmarkSchema
  }, {
    name: "Token",
    schema: TokenSchema
  }])],
  providers: [BookmarksService, BookmarksResolver, TokensService]
})
export class BookmarksModule {}
