import {Module} from '@nestjs/common';
import {TweetsResolver} from './tweets.resolver';
import {TweetsService} from './tweets.service';
import {MongooseModule} from "@nestjs/mongoose";
import TweetSchema from "./schemas/tweet.schema";
import User from "../auth/schemas/auth.schema";
import {TokensService} from "../tokens/tokens.service";
import TokenSchema from "../tokens/token.schema";
import {FilesService} from "../files/files.service";
import {FollowingService} from "../following/following.service";
import FollowingSchema from "../following/schemas/following.schema";
import {LikesService} from "../likes/likes.service";
import LikesSchema from "../likes/schemas/likes.schema";
import {RetweetsService} from "../retweets/retweets.service";
import CommentsSchema from "../comments/schemas/comments.schema";
import {CommentsService} from "../comments/comments.service";
import RetweetsSchema from "../retweets/schemas/retweets.schema";
import {BookmarksService} from "../bookmarks/bookmarks.service";
import BookmarkSchema from "../bookmarks/schemas/bookmark.schema";
import {HashtagsService} from "../hashtags/hashtags.service";
import HashtagSchema from "../hashtags/schemas/hashtag.schema";
import {SearchService} from "../search/search.service";
import {UserService} from "../user/user.service";

@Module({
    imports: [MongooseModule.forFeature([{
        name: "Tweet",
        schema: TweetSchema
    }, {
        name: "User",
        schema: User
    }, {
        name: "Token", schema: TokenSchema
    }, {
        name: "Following",
        schema: FollowingSchema
    }, {
        name: "Likes",
        schema: LikesSchema
    }, {
        name: "Comments",
        schema: CommentsSchema
    }, {
        name: "Retweets",
        schema: RetweetsSchema
    }, {
        name: "Bookmark",
        schema: BookmarkSchema
    }, {
        name: "Hashtag",
        schema: HashtagSchema
    }])],
    providers: [TweetsResolver, TweetsService, TokensService, FilesService, FollowingService, LikesService, TweetsService, CommentsService, RetweetsService, BookmarksService, HashtagsService, SearchService, UserService]
})
export class TweetsModule {
}
