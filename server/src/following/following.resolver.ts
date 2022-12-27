import {Args, Context, Mutation, Query, Resolver} from '@nestjs/graphql';
import {GraphQLExecutionContextWithReqAndRes} from "../declarations/graphqlContext";
import {UseGuards} from "@nestjs/common";
import {AuthGuard} from "../globalGuards/auth.guard";
import {FollowingService} from "./following.service";
import {FollowingModel} from "./entities/following.model";
import {FollowingWithoutRefModel} from "./entities/followingWithoutRef.model";
import {FollowModel} from "./entities/followModel";
import {FollowerModel} from "./entities/follower.model";


@Resolver(of => FollowingModel)
export class FollowingResolver {

    constructor(private followingService: FollowingService) {
    }

    @UseGuards(AuthGuard)
    @Query(returns => FollowingWithoutRefModel)
    getFollowingData(@Args("pseudonym") pseudonym: string, @Context() context: GraphQLExecutionContextWithReqAndRes) {
        const user = context.req.user;
        return this.followingService.getFollowingData(pseudonym, user);
    }

    @UseGuards(AuthGuard)
    @Query(returns => [FollowerModel])
    getFollowing(@Args("pseudonym") pseudonym: string, @Context() context: GraphQLExecutionContextWithReqAndRes) {
        const user = context.req.user;
        return this.followingService.getFollowing(pseudonym, user);
    }

    @UseGuards(AuthGuard)
    @Query(returns => [FollowerModel])
    getFollowers(@Args("pseudonym") pseudonym: string, @Context() context: GraphQLExecutionContextWithReqAndRes) {
        const user = context.req.user;
        return this.followingService.getFollowers(pseudonym, user);
    }

    @UseGuards(AuthGuard)
    @Mutation(returns => Boolean)
    async follow(@Args("followData") followData: FollowModel,
                 @Context() context: GraphQLExecutionContextWithReqAndRes) {
        const user = context.req.user;
        return await this.followingService.follow(followData.pseudonym, user, followData.isUserFollowing);
    }

    @UseGuards(AuthGuard)
    @Mutation(returns => Boolean)
    async unfollow(@Args("pseudonym", {type: () => String}) pseudonym: string ,
                 @Context() context: GraphQLExecutionContextWithReqAndRes) {
        const user = context.req.user;
        return await this.followingService.unfollow(pseudonym, user);
    }

}
