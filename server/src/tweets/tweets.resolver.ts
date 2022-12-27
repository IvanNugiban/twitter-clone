import {Args, Context, Mutation, Query, Resolver} from '@nestjs/graphql';
import {TweetModel} from "./entities/tweet.model";
import {UseGuards} from "@nestjs/common";
import {AuthGuard} from "../globalGuards/auth.guard";
import {GraphQLExecutionContextWithReqAndRes} from "../declarations/graphqlContext";
import {TweetsService} from "./tweets.service";
import {TweetInputModel} from "./entities/tweet-input.model";
import {TweetsHomeInputModel} from "./entities/tweetsHome-input.model";
import {TweetsOutputModel} from "./entities/tweetsOutput.model";
import {TweetCommunicateModel} from "./entities/tweetCommunicateModel";
import {TweetsLimitInputModel} from "./entities/tweetsLimit-input.model";
import {TweetSearchInputModel} from "./entities/tweetSearch-input.model";

@Resolver(of => TweetModel)
export class TweetsResolver {
    constructor(private tweetsService: TweetsService) {
    }

    @UseGuards(AuthGuard)
    @Mutation(returns => TweetModel)
    async createTweet(@Args("TweetData") tweetData: TweetInputModel, @Context() context: GraphQLExecutionContextWithReqAndRes) {
        const user = context.req.user;
        return await this.tweetsService.createTweet(tweetData, user);
    }

    @UseGuards(AuthGuard)
    @Mutation(returns => Boolean)
    async deleteTweet(@Args("tweetId") tweetId: string) {
        return await this.tweetsService.deleteTweet(tweetId);
    }

    @UseGuards(AuthGuard)
    @Query(returns => TweetModel)
    async getTweetById(@Args("tweetId", {type: () => String}) tweetId: string) {
        return await this.tweetsService.getTweetById(tweetId);
    }

    @UseGuards(AuthGuard)
    @Query(returns => TweetsOutputModel)
    async getHomeTweets(@Args("HomeTweetsData") homeTweetsData: TweetsHomeInputModel, @Context() context: GraphQLExecutionContextWithReqAndRes) {
        const user = context.req.user;
        return await this.tweetsService.getHomeTweets(user, homeTweetsData);
    }

    @UseGuards(AuthGuard)
    @Query(returns => TweetsOutputModel)
    async getSearchedTweets (@Args("TweetSearch") tweetSearch: TweetSearchInputModel) {
        return await this.tweetsService.getSearchedTweets(tweetSearch);
    }

    @UseGuards(AuthGuard)
    @Query(returns => TweetCommunicateModel)
    async getCommunicateData(@Args("tweetId", {type: () => String}) tweetId: string, @Context() context: GraphQLExecutionContextWithReqAndRes) {
        const userId = context.req.user.id;
        return await this.tweetsService.getCommunicateData(tweetId, userId);
    }


    @UseGuards(AuthGuard)
    @Query(returns => TweetsOutputModel)
    async getProfileTweets(@Args("ProfileTweetsData") profileTweetsData: TweetsLimitInputModel) {
        return await this.tweetsService.getProfileTweets(profileTweetsData);
    }

    @UseGuards(AuthGuard)
    @Query(returns => TweetsOutputModel)
    async getRetweets(@Args("ProfileTweetsData") profileTweetsData: TweetsLimitInputModel) {
        return await this.tweetsService.getRetweets(profileTweetsData);
    }

    @UseGuards(AuthGuard)
    @Query(returns => TweetsOutputModel)
    async getTweetsWithMedia(@Args("ProfileTweetsData") profileTweetsData: TweetsLimitInputModel) {
        return await this.tweetsService.getMediaTweets(profileTweetsData);
    }

    @UseGuards(AuthGuard)
    @Query(returns => TweetsOutputModel)
    async getLikedTweets(@Args("ProfileTweetsData") profileTweetsData: TweetsLimitInputModel) {
        return await this.tweetsService.getLikedTweets(profileTweetsData);
    }


    @UseGuards(AuthGuard)
    @Query(returns => TweetsOutputModel)
    async getBookmarks(@Args("ProfileTweetsData") profileTweetsData: TweetsLimitInputModel) {
        return await this.tweetsService.getBookmarks(profileTweetsData);
    }

    @UseGuards(AuthGuard)
    @Query(returns => TweetsOutputModel)
    async getAllTweets(@Args("ProfileTweetsData") profileTweetsData: TweetsLimitInputModel) {
        return await this.tweetsService.getAllTweets(profileTweetsData);
    }
}
