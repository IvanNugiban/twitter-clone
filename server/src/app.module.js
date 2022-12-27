"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var config_1 = require("@nestjs/config");
var auth_module_1 = require("./auth/auth.module");
var mongoose_1 = require("@nestjs/mongoose");
var graphql_1 = require("@nestjs/graphql");
var apollo_1 = require("@nestjs/apollo");
var path_1 = require("path");
var tokens_module_1 = require("./tokens/tokens.module");
var email_module_1 = require("./email/email.module");
var profile_module_1 = require("./profile/profile.module");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        (0, common_1.Module)({
            imports: [config_1.ConfigModule.forRoot({
                    envFilePath: ".env"
                }), mongoose_1.MongooseModule.forRoot(process.env.dbUrl), tokens_module_1.TokensModule, graphql_1.GraphQLModule.forRoot({
                    driver: apollo_1.ApolloDriver,
                    cors: {
                        credentials: true,
                        origin: true
                    },
                    context: function (_a) {
                        var req = _a.req, res = _a.res;
                        return ({ req: req, res: res });
                    },
                    autoSchemaFile: (0, path_1.join)(process.cwd(), 'src/schema.gql')
                }), auth_module_1.AuthModule, email_module_1.EmailModule, profile_module_1.ProfileModule]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
