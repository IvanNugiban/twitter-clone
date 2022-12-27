import {Injectable} from '@nestjs/common';
import * as jwt from "jsonwebtoken";
import {InjectModel} from "@nestjs/mongoose";
import {IToken} from "./interfaces/TokenInterfaces";
import {Model} from 'mongoose';
import {UserDto} from "../auth/dto/user-dto";

@Injectable()
export class TokensService {
    constructor(@InjectModel("Token") private tokenModel: Model<IToken>) {
    }

    async validateToken(token: string, secretKey: string) {
        return jwt.verify(token, secretKey);
    }

    async generateAndSaveTokens(user: UserDto) {
        const {accessToken, refreshToken} = this.generateTokens({...user});
        await this.saveRefreshToken(user.id, refreshToken);
        return {accessToken, refreshToken};
    }

    generateTokens(payload: any) {
        const accessToken = jwt.sign(payload, process.env.ACCESS_KEY, {expiresIn: '15m'});
        const refreshToken = jwt.sign(payload, process.env.REFRESH_KEY, {expiresIn: "30d"});
        return {
            accessToken,
            refreshToken
        }
    }

    async saveRefreshToken(userId: string, refreshToken: string) {
        const possibleToken = await this.tokenModel.findOne({userId: userId});

        if (possibleToken) {
            possibleToken.refreshToken = refreshToken;
            possibleToken.save();
        }

        return await this.tokenModel.create({userId, refreshToken});
    }

    async deleteToken(userId: string) {
    return  this.tokenModel.deleteOne({userId});
    }

    async findRefreshToken(refreshToken : string) {
    return this.tokenModel.findOne({refreshToken})
    }
}
