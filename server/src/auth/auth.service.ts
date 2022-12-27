import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {IUser} from "./interfaces/UserInterface";
import * as bcrypt from "bcrypt";
import {TokensService} from "../tokens/tokens.service";
import {userModel} from "./entities/user.model"
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {UserDto} from "./dto/user-dto";
import {ILoginReturn} from "./interfaces/LoginInterface";
import {EmailService} from "../email/email.service";
import {IVerification} from "./interfaces/IVerification";
import {VerificationModel} from "./entities/verification.model";
import {LoginInputModel} from "./entities/loginInput.model";
import {FollowingModel} from "../following/entities/following.model";
import {PasswordResetDataModel} from "./entities/passwordResetData.model";


@Injectable()
export class AuthService {

    constructor(private tokensService: TokensService,
                private emailService: EmailService, @InjectModel("User") private userSchema: Model<IUser>,
                @InjectModel("Verification") private verificationSchema: Model<IVerification>,
                @InjectModel("Following") private followingSchema: Model<FollowingModel>,) {
    }


    private async getByEmail(email: string): Promise<IUser | null> {
        return this.userSchema.findOne({email});
    }

    private async getByPseudonym(pseudonym: string): Promise<IUser | null> {
        return this.userSchema.findOne({pseudonym});
    }

    async checkCode(forEmail: string, code: number) {
        const verificationCodes: IVerification[] | [] = await this.verificationSchema.find({forEmail});

        if (verificationCodes.length === 0) throw new HttpException("Verification code has expired. Try to resend the code", HttpStatus.GONE);

        const sortedCodes = verificationCodes.sort((codeA, codeB) => {
            return codeB.expiresIn.getTime() - codeA.expiresIn.getTime();
        })


        if (sortedCodes[0].code !== code) throw new HttpException("The code is incorrect or has already expired", HttpStatus.BAD_REQUEST)
        return true
    }

    async refresh(refreshToken: string) {
        const errorMessage = "User not authorized"
        if (!refreshToken) throw new HttpException(errorMessage, HttpStatus.UNAUTHORIZED);
        const validatedToken = await this.tokensService.validateToken(refreshToken, process.env.REFRESH_KEY) as UserDto;
        const tokenFromDatabase = await this.tokensService.findRefreshToken(refreshToken);
        if (!validatedToken || !tokenFromDatabase) throw new HttpException(errorMessage, HttpStatus.UNAUTHORIZED);

        const user = await this.userSchema.findById(validatedToken.id);


        const userDto = new UserDto(user);
        const tokens = await this.tokensService.generateAndSaveTokens(userDto);
        return {
            ...userDto,
            ...tokens
        };

    }

    async checkRegisterData(userToRegister: userModel) {
        const user: IUser = await this.getByEmail(userToRegister.email);
        if (user) throw new HttpException("User with this email already exist", HttpStatus.BAD_REQUEST);
        const possiblePseudonym = await this.getByPseudonym(userToRegister.pseudonym);
        if (possiblePseudonym) throw new HttpException("User with this pseudonym already exist", HttpStatus.BAD_REQUEST);

        await this.emailService.saveAndSendVerificationCode(userToRegister.email);
        return userToRegister;
    }

    async resetPassword(newPasswordData: PasswordResetDataModel) {
        const user = await this.userSchema.findOne({email: newPasswordData.userEmail});
        if (!user) throw new HttpException("User is not found", HttpStatus.NOT_FOUND)
        const hashedPassword = await bcrypt.hash(newPasswordData.password, Number(process.env.HASH_SALT));
        user.password = hashedPassword;
        await user.save();
        return true;
    }

    async checkLoginData(emailOrUsername) {
        let userData: IUser | undefined;
        const possibleEmail = await this.userSchema.findOne({email: emailOrUsername}).lean();
        const possiblePseudonym = await this.userSchema.findOne({pseudonym: emailOrUsername}).lean();


        if (possibleEmail) userData = possibleEmail;
        else if (possiblePseudonym) userData = possiblePseudonym;
        else throw new HttpException("We couldn't find your account.", HttpStatus.BAD_REQUEST);

        return userData;
    }

    async verifyAndRegister(verificationData: VerificationModel): Promise<ILoginReturn> {
        await this.checkCode(verificationData.user.email, verificationData.code);

        return await this.register(verificationData.user)
    }

    async register(userToRegister: userModel) {
        await this.checkRegisterData(userToRegister);
        const hashedPassword = await bcrypt.hash(userToRegister.password, Number(process.env.HASH_SALT));

        const newUser = await this.userSchema.create({
            ...userToRegister,
            password: hashedPassword
        });

        await this.followingSchema.create({
            userRef: newUser.id
        })

        return await this.login({
            emailOrUsername: newUser.email,
            password: userToRegister.password
        });
    }

    async login(loginData: LoginInputModel): Promise<ILoginReturn> {
        const userData = await this.checkLoginData(loginData.emailOrUsername);

        const ifPasswordEquals = await bcrypt.compare(loginData.password, userData.password);
        if (!ifPasswordEquals) throw new HttpException("We can't log you in. Please, check data correctness and try again", HttpStatus.BAD_REQUEST);

        const userDto = new UserDto(userData);

        const tokens = await this.tokensService.generateAndSaveTokens(userDto);

        return {
            ...userDto,
            ...tokens
        };
    }

    async logout(refreshToken: string) {
        if (!refreshToken) throw new HttpException("User isn't authorized", HttpStatus.UNAUTHORIZED);
        const validatedToken = await this.tokensService.validateToken(refreshToken, process.env.REFRESH_KEY) as UserDto;
        if (!validatedToken) throw new HttpException("User isn't authorized", HttpStatus.UNAUTHORIZED);
        await this.tokensService.deleteToken(validatedToken.id);
        return validatedToken.id;
    }

    async setFontSize(fontSize: string, userId: string) {
        const user = await this.userSchema.findById(userId);
        if (!user) throw new HttpException("User isn't authorized", HttpStatus.UNAUTHORIZED);
        user.fontSizeLevel = fontSize;
        await user.save();
        return true;
    }

    async setTheme(theme: string, userId: string) {
        const user = await this.userSchema.findById(userId);
        if (!user) throw new HttpException("User isn't authorized", HttpStatus.UNAUTHORIZED);
        user.theme = theme;
        await user.save();
        return true;
    }

    async setColor(color: string, userId: string) {
        const user = await this.userSchema.findById(userId);
        if (!user) throw new HttpException("User isn't authorized", HttpStatus.UNAUTHORIZED);
        user.color = color;
        await user.save();
        return true;
    }
}
