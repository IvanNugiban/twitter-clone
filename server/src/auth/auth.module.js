"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthModule = void 0;
var common_1 = require("@nestjs/common");
var auth_service_1 = require("./auth.service");
var auth_resolver_1 = require("./auth.resolver");
var mongoose_1 = require("@nestjs/mongoose");
var auth_schema_1 = require("./schemas/auth.schema");
var tokens_module_1 = require("../tokens/tokens.module");
var email_service_1 = require("../email/email.service");
var verification_schema_1 = require("./schemas/verification.schema");
var AuthModule = /** @class */ (function () {
    function AuthModule() {
    }
    AuthModule = __decorate([
        (0, common_1.Module)({
            imports: [mongoose_1.MongooseModule.forFeature([{
                        name: "User",
                        schema: auth_schema_1["default"]
                    }]), mongoose_1.MongooseModule.forFeature([{ name: "Verification", schema: verification_schema_1["default"] }]), tokens_module_1.TokensModule],
            providers: [auth_service_1.AuthService, auth_resolver_1.AuthResolver, email_service_1.EmailService]
        })
    ], AuthModule);
    return AuthModule;
}());
exports.AuthModule = AuthModule;
