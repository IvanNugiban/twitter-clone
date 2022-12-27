import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {IUser} from "../auth/interfaces/UserInterface";
import {UsersSearchInputModel} from "./entities/usersSearch-input.model";

@Injectable()
export class UserService {

    constructor(@InjectModel("User") private userSchema: Model<IUser>) {}



    private async findByPseudonym(pseudonym: string) {
        const possibleUser : IUser | undefined = await this.userSchema.findOne({pseudonym})
        if (!possibleUser) throw new HttpException("User not found", HttpStatus.NOT_FOUND)
        return possibleUser;
    }

    async getUser(pseudonym: string) {
        const user : IUser | undefined = await this.findByPseudonym(pseudonym)

        return {
            username: user.username,
            pseudonym: user.pseudonym,
            dateOfJoining: user.dateOfJoining,
            description: user.description,
            website: user.website,
            avatar: user.avatar,
            profileBackground: user.profileBackground
        }
    }

    async getUsersByRegex(pseudonym) {
        return this.userSchema.find({ "pseudonym": { "$regex": pseudonym, "$options": "i" } });
    }

    async getSearchedUsers(userSearch: UsersSearchInputModel) {
        const foundUsers = await this.getUsersByRegex(userSearch.searchRequest);

        if (foundUsers.length === 0) throw new HttpException("Users not found", HttpStatus.NOT_FOUND);

        return {
            users: foundUsers.reverse().slice(userSearch.limit, userSearch.limit + userSearch.initialLimit),
            hasMore: foundUsers.length > userSearch.limit
        }
    }
}
