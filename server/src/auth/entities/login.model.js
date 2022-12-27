"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LoginModel = void 0;
var graphql_1 = require("@nestjs/graphql");
var LoginModel = /** @class */ (function () {
    function LoginModel() {
    }
    __decorate([
        (0, graphql_1.Field)({ description: "Username" })
    ], LoginModel.prototype, "username");
    __decorate([
        (0, graphql_1.Field)({ description: "Email" })
    ], LoginModel.prototype, "email");
    __decorate([
        (0, graphql_1.Field)({ description: "Pseudonym" })
    ], LoginModel.prototype, "pseudonym");
    __decorate([
        (0, graphql_1.Field)({ description: "Date of joining" })
    ], LoginModel.prototype, "dateOfJoining");
    __decorate([
        (0, graphql_1.Field)({ description: "Description", nullable: true })
    ], LoginModel.prototype, "description");
    __decorate([
        (0, graphql_1.Field)({ description: "Birthday" })
    ], LoginModel.prototype, "birthday");
    __decorate([
        (0, graphql_1.Field)({ description: "Avatar", nullable: true })
    ], LoginModel.prototype, "avatar");
    __decorate([
        (0, graphql_1.Field)({ description: "Profile background", nullable: true })
    ], LoginModel.prototype, "profileBackground");
    __decorate([
        (0, graphql_1.Field)({ description: "Website", nullable: true })
    ], LoginModel.prototype, "website");
    __decorate([
        (0, graphql_1.Field)(function (type) { return [String]; }, { description: "Bookmarks" })
    ], LoginModel.prototype, "bookmarks");
    __decorate([
        (0, graphql_1.Field)(function (type) { return [String]; }, { description: "Following" })
    ], LoginModel.prototype, "following");
    __decorate([
        (0, graphql_1.Field)(function (type) { return [String]; }, { description: "Followers" })
    ], LoginModel.prototype, "followers");
    __decorate([
        (0, graphql_1.Field)(function (type) { return [String]; }, { description: "Likes" })
    ], LoginModel.prototype, "likes");
    __decorate([
        (0, graphql_1.Field)({ description: "Access token" })
    ], LoginModel.prototype, "accessToken");
    LoginModel = __decorate([
        (0, graphql_1.ObjectType)({ description: "Auth" })
    ], LoginModel);
    return LoginModel;
}());
exports.LoginModel = LoginModel;
