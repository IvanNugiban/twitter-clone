import {Args, Context, ID, Mutation, Resolver} from '@nestjs/graphql';
import {UseGuards} from "@nestjs/common";
import {AuthGuard} from "../globalGuards/auth.guard";
import {GraphQLExecutionContextWithReqAndRes} from "../declarations/graphqlContext";
import {BookmarksService} from "./bookmarks.service";

@Resolver()
export class BookmarksResolver {

    constructor(private bookmarkService: BookmarksService) {
    }

    @Mutation(returns => Boolean)
    @UseGuards(AuthGuard)
    async addBookmark(@Args("tweetId", {type: () => ID}) tweetId: string, @Context() context: GraphQLExecutionContextWithReqAndRes) {
        const userId = context.req.user.id;
        await this.bookmarkService.addBookmark(tweetId, userId);
        return true;
    }

    @Mutation(returns => Boolean)
    @UseGuards(AuthGuard)
    async clearAllBookmarks(@Context() context: GraphQLExecutionContextWithReqAndRes) {
        const userId = context.req.user.id;
        await this.bookmarkService.clearAllBookmarks(userId);
        return true;
    }
}
