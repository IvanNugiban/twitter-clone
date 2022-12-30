import {Args, Context, Field, Mutation, Resolver} from '@nestjs/graphql';
import {ProfileModel} from "./entities/profile.model";
import {ProfileInputModel} from "./entities/profile-input.model"
import {HttpException, HttpStatus, UseGuards} from "@nestjs/common";
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
        if (profile.website !== "" && profile.website && !/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/ig.test(profile.website)) throw new HttpException("Please, enter correct website", HttpStatus.BAD_REQUEST)
        return await this.profileService.updateProfile(profile, user);
    }

}
