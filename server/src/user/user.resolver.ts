import {Args, Query, Resolver} from '@nestjs/graphql';
import {UserModel} from "./entities/user.model";
import {UserService} from "./user.service";
import {UsersSearchInputModel} from "./entities/usersSearch-input.model";
import {UserSearchOutputModel} from "./entities/userSearchOutput.model";

@Resolver(of => UserModel)
export class UserResolver {

    constructor(private userService: UserService) {
    }

    @Query(returns => UserModel)
    async getUser(@Args("pseudonym", {type: () => String}) pseudonym: string) {
        return await this.userService.getUser(pseudonym)
    }

    @Query(returns => UserSearchOutputModel)
    async getSearchedUsers(@Args("UsersSearch") usersSearch: UsersSearchInputModel) {
        return await this.userService.getSearchedUsers(usersSearch);
    }

}
