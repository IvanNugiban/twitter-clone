import {Args, Context, ID, Mutation, Resolver} from '@nestjs/graphql';
import {RetweetModel} from "./entities/retweet.model";
import {UseGuards} from "@nestjs/common";
import {AuthGuard} from "../globalGuards/auth.guard";
import {GraphQLExecutionContextWithReqAndRes} from "../declarations/graphqlContext";
import {RetweetsService} from "./retweets.service";

@Resolver(of => RetweetModel)
export class RetweetsResolver {

    constructor(private retweetService: RetweetsService) {
    }

    @Mutation(returns => Boolean)
    @UseGuards(AuthGuard)
    async retweet(@Args("tweetId", {type: () => ID}) tweetId: string, @Context() context: GraphQLExecutionContextWithReqAndRes) {
        const userId = context.req.user.id;
        await this.retweetService.retweet(tweetId, userId);
        return true;
    }

}
