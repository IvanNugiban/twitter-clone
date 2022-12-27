import {Args, Context, Field, Mutation, Resolver} from '@nestjs/graphql';
import {ProfileModel} from "./entities/profile.model";
import {ProfileInputModel} from "./entities/profile-input.model"
import {UseGuards} from "@nestjs/common";
import {ProfileService} from "./profile.service";
import {AuthGuard} from "../globalGuards/auth.guard";
import {GraphQLExecutionContextWithReqAndRes} from "../declarations/graphqlContext";

@Resolver(of => ProfileModel)
export class ProfileResolver {

    constructor(private profileService: ProfileService) {
    }

    @Mutation(returns => ProfileModel)
    @UseGuards(AuthGuard)
    async saveChanges(@Args("Profile") profile: ProfileInputModel, @Context() context: GraphQLExecutionContextWithReqAndRes) {
        const user = context.req.user;
        return await this.profileService.updateProfile(profile, user);
    }

}
