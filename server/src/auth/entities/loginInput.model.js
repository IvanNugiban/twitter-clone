"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LoginInputModel = void 0;
var graphql_1 = require("@nestjs/graphql");
var class_validator_1 = require("class-validator");
var LoginInputModel = /** @class */ (function () {
    function LoginInputModel() {
    }
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.Length)(1, 100, { message: "Minimum number of characters - 1, maximum - 100" }),
        (0, graphql_1.Field)({ description: "Email or username" })
    ], LoginInputModel.prototype, "emailOrUsername");
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.Length)(4, 50, { message: "Minimum number of characters - 4, maximum - 50" }),
        (0, graphql_1.Field)({ description: "Password" })
    ], LoginInputModel.prototype, "password");
    LoginInputModel = __decorate([
        (0, graphql_1.InputType)("LoginType")
    ], LoginInputModel);
    return LoginInputModel;
}());
exports.LoginInputModel = LoginInputModel;
