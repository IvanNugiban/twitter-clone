import {Args, Context, Query, Resolver} from '@nestjs/graphql';
import {UserModel} from "../user/entities/user.model";
import {UseGuards} from "@nestjs/common";
import {AuthGuard} from "../globalGuards/auth.guard";
import {GraphQLExecutionContextWithReqAndRes} from "../declarations/graphqlContext";
import {SearchService} from "./search.service";
import {SearchForResultsModel} from "./entities/searchForResults.model";

@Resolver()
export class SearchResolver {

    constructor(private searchService: SearchService) {
    }

    @Query(returns => SearchForResultsModel)
    @UseGuards(AuthGuard)
    async searchForResults(@Args("searchRequest", {type: () => String}) searchRequest: string, @Context() context: GraphQLExecutionContextWithReqAndRes) {
        const userId = context.req.user.id;
        return await this.searchService.searchForResults(searchRequest, userId);
    }

    @Query(returns => [UserModel])
    @UseGuards(AuthGuard)
    async getRecommendedUsers(@Context() context: GraphQLExecutionContextWithReqAndRes) {
        const userId = context.req.user.id;
        return await this.searchService.getRecommendedUsers(userId);
    }
}
