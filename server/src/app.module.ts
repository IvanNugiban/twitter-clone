import {Module} from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {AuthModule} from "./auth/auth.module";
import {MongooseModule} from '@nestjs/mongoose';
import {GraphQLModule} from "@nestjs/graphql";
import {ApolloDriver, ApolloDriverConfig} from "@nestjs/apollo";
import {TokensModule} from './tokens/tokens.module';
import {EmailModule} from './email/email.module';
import {ProfileModule} from "./profile/profile.module";
import {ServeStaticModule} from "@nestjs/serve-static";
import {UserModule} from "./user/user.module";
import {FollowingModule} from "./following/following.module";
import {TweetsModule} from "./tweets/tweets.module";
import {LikesModule} from "./likes/likes.module";
import {CommentsModule} from "./comments/comments.module";
import {RetweetsModule} from "./retweets/retweets.module";
import { BookmarksModule } from './bookmarks/bookmarks.module';
import {SearchModule} from "./search/search.module";
import {HashtagsModule} from "./hashtags/hashtags.module";
import * as path from "path";

@Module({
    imports: [ConfigModule.forRoot({
        envFilePath: ".env"
    }), GraphQLModule.forRoot<ApolloDriverConfig>({
        driver: ApolloDriver,
        cors: {
            credentials: true,
            origin: process.env.ORIGIN
        },
        context: ({req, res}) => ({req, res}),
        autoSchemaFile: path.join(process.cwd(), 'src/schema.gql')
    }), ServeStaticModule.forRoot({
        rootPath: path.resolve(__dirname, 'static'),
    }), MongooseModule.forRoot(process.env.dbUrl), TokensModule, AuthModule, EmailModule, ProfileModule, UserModule, FollowingModule, TweetsModule, LikesModule, CommentsModule, RetweetsModule, BookmarksModule, SearchModule, HashtagsModule]
})
export class AppModule {
}
