import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {TokensService} from "../tokens/tokens.service";
import {GqlExecutionContext} from "@nestjs/graphql";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private tokensService: TokensService) {
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const ctx = GqlExecutionContext.create(context);
        const req = ctx.getContext().req;
        const message = "Auth error"


        try {
            const authHeader = req.headers.authorization;
            const bearer = authHeader.split(" ")[0];
            const accessToken = authHeader.split(" ")[1]

            if (bearer != "Bearer" || !accessToken) throw new UnauthorizedException({message});

            const decodedToken = await this.tokensService.validateToken(accessToken, process.env.ACCESS_KEY);

            if (!decodedToken) throw new UnauthorizedException({message});

            req.user = decodedToken;

            return true;

        } catch (e) {
            throw new UnauthorizedException({message})
        }
    }
}