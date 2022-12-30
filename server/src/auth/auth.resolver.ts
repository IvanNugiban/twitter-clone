import {Args, Context, ID, Mutation, Query, Resolver} from "@nestjs/graphql";
import {userModel} from "./entities/user.model";
import {AuthService} from "./auth.service";
import {VerificationModel} from "./entities/verification.model";
import {LoginModel} from "./entities/login.model";
import {EmailService} from "../email/email.service";
import {LoginInputModel} from "./entities/loginInput.model";
import {GraphQLExecutionContextWithReqAndRes} from "../declarations/graphqlContext";
import {User} from "../globalDecorators/user.decorator";
import {UserDto} from "./dto/user-dto";
import {HttpException, HttpStatus, UseGuards} from "@nestjs/common";
import {AuthGuard} from "../globalGuards/auth.guard";
import {PasswordResetCodeModel} from "./entities/passwordResetCode.model";
import {PasswordResetDataModel} from "./entities/passwordResetData.model";


@Resolver(of => userModel)
export class AuthResolver {

    constructor(private authService: AuthService, private emailService: EmailService) {

    }

    @Query(returns => LoginModel)
    async refresh(@Context() context: GraphQLExecutionContextWithReqAndRes) {
        const refreshToken = context.req.cookies.refreshToken;
        const userData = await this.authService.refresh(refreshToken);
        context.res.cookie("refreshToken", userData.refreshToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
            secure: true,
            sameSite: "none"
        })
        delete userData.refreshToken;
        return userData;
    }

    @Mutation(returns => userModel)
    async checkRegisterData(@Args("User") user: userModel) {
        if (user.password.includes(" ")) throw new HttpException("Password must not contain whitespaces", HttpStatus.BAD_REQUEST);
        return await this.authService.checkRegisterData(user);
    }

    @Mutation(returns => String)
    async checkLoginData(@Args("user", {type: () => String}) emailOrUsername: string) {
        const response = await this.authService.checkLoginData(emailOrUsername);
        return response.email
    }


    @Mutation(returns => LoginModel)
    async checkVerificationCode(@Args("Verification") verificationData: VerificationModel,
                                @Context() context: GraphQLExecutionContextWithReqAndRes) {
        const validationResult = await this.authService.verifyAndRegister(verificationData);
        context.res.cookie("refreshToken", validationResult.refreshToken, {
            maxAge: 30 * 24 * 60 * 1000,
            httpOnly: true,
            secure: true,
            sameSite: "none"
        });
        delete validationResult.refreshToken;
        return validationResult;
    }

    @Mutation(returns => Boolean)
    async checkPasswordResetCode(@Args("Verification") verificationData: PasswordResetCodeModel) {
        return await this.authService.checkCode(verificationData.userEmail, verificationData.code);
    }

    @Mutation(returns => String)
    async sendVerificationCode(@Args("Email", {type: () => String}) email: string, @User() user: UserDto) {
        return await this.emailService.saveAndSendVerificationCode(email)
    }

    @Mutation(returns => Boolean)
    async resetPassword(@Args("NewPasswordData") newPasswordData: PasswordResetDataModel) {
        return await this.authService.resetPassword(newPasswordData);
    }

    @Mutation(returns => LoginModel)
    async login(@Args("LoginInput") loginData: LoginInputModel,
                @Context() context: GraphQLExecutionContextWithReqAndRes) {
        const loggedInUser = await this.authService.login(loginData);
        context.res.cookie("refreshToken", loggedInUser.refreshToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
            secure: true,
            sameSite: "none"
        })
        delete loggedInUser.refreshToken;
        return loggedInUser;
    }

    @Mutation(returns => ID)
    async logout(@Context() context: GraphQLExecutionContextWithReqAndRes) {

        const refreshToken = context.req.cookies.refreshToken;

        context.res.clearCookie("refreshToken");

        return await this.authService.logout(refreshToken);
    }

    @UseGuards(AuthGuard)
    @Mutation(returns => Boolean)
    async setFontSize(@Args("fontSize", {type: () => String}) fontSize: string, @Context() context: GraphQLExecutionContextWithReqAndRes) {
        const userId = context.req.user.id;
        return await this.authService.setFontSize(fontSize, userId)
    }

    @UseGuards(AuthGuard)
    @Mutation(returns => Boolean)
    async setTheme(@Args("theme", {type: () => String}) theme: string, @Context() context: GraphQLExecutionContextWithReqAndRes) {
        const userId = context.req.user.id;
        return await this.authService.setTheme(theme, userId)
    }

    @UseGuards(AuthGuard)
    @Mutation(returns => Boolean)
    async setColor(@Args("color", {type: () => String}) color: string, @Context() context: GraphQLExecutionContextWithReqAndRes) {
        const userId = context.req.user.id;
        return await this.authService.setColor(color, userId)
    }
}