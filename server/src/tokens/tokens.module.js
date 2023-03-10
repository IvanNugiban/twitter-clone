"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TokensModule = void 0;
var common_1 = require("@nestjs/common");
var tokens_service_1 = require("./tokens.service");
var mongoose_1 = require("@nestjs/mongoose");
var token_schema_1 = require("./token.schema");
var TokensModule = /** @class */ (function () {
    function TokensModule() {
    }
    TokensModule = __decorate([
        (0, common_1.Module)({
            imports: [mongoose_1.MongooseModule.forFeature([{ name: "Token", schema: token_schema_1["default"] }])],
            exports: [tokens_service_1.TokensService],
            providers: [tokens_service_1.TokensService]
        })
    ], TokensModule);
    return TokensModule;
}());
exports.TokensModule = TokensModule;
