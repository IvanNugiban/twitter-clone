import {Args, Context, Mutation, Resolver} from '@nestjs/graphql';
import {GraphQLExecutionContextWithReqAndRes} from "../declarations/graphqlContext";
import {LikesService} from "./likes.service";
import {UseGuards} from "@nestjs/common";
import {AuthGuard} from "../globalGuards/auth.guard";

@Resolver(of => Boolean)
export class LikesResolver {

    constructor(private likesService: LikesService) {
    }

    @UseGuards(AuthGuard)
    @Mutation(returns => Boolean)
    async likeTweet(@Args("tweetRef", {type: () => String}) tweetRef: string, @Context() context: GraphQLExecutionContextWithReqAndRes) {
        const userId = context.req.user.id;
        await this.likesService.likeTweet(userId, tweetRef)
        return true;
    }

}
