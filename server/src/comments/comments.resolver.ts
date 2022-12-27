import {Args, Context, Mutation, Query, Resolver} from '@nestjs/graphql';
import {CommentsInputModel} from "./entities/comments-input.model";
import {CommentsService} from "./comments.service";
import {AuthGuard} from "../globalGuards/auth.guard";
import {UseGuards} from "@nestjs/common";
import {GraphQLExecutionContextWithReqAndRes} from "../declarations/graphqlContext";
import {CommentsFetchModel} from "./entities/commentsFetch-model";
import {CommentsOutputModel} from "./entities/commentsOutput-model";
import {CommentsModel} from "./entities/comments.model";

@Resolver()
export class CommentsResolver {

    constructor(private commentsService: CommentsService) {
    }

    @Mutation(returns => Boolean)
    @UseGuards(AuthGuard)
    async createComment(@Args("commentData") commentData: CommentsInputModel, @Context() context: GraphQLExecutionContextWithReqAndRes) {
        const userPseudonym = context.req.user.pseudonym;
        await this.commentsService.createComment(commentData, userPseudonym);
        return true;
    }

    @Query(returns => CommentsOutputModel)
    @UseGuards(AuthGuard)
    async getAllComments(@Args("CommentData") commentData: CommentsFetchModel) {
        return await this.commentsService.getAllComments(commentData);
    }

    @Query(returns => CommentsModel)
    @UseGuards(AuthGuard)
    async getCommentById(@Args("commentId", {type: () => String}) commentId: string) {
        return await this.commentsService.getCommentById(commentId);
    }

}
