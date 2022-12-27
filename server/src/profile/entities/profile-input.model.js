"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProfileInputModel = void 0;
var graphql_1 = require("@nestjs/graphql");
var graphql_upload_1 = require("graphql-upload");
var ProfileInputModel = /** @class */ (function () {
    function ProfileInputModel() {
    }
    __decorate([
        (0, graphql_1.Field)({ description: "Username" })
    ], ProfileInputModel.prototype, "username");
    __decorate([
        (0, graphql_1.Field)({ nullable: true, description: "Description" })
    ], ProfileInputModel.prototype, "description");
    __decorate([
        (0, graphql_1.Field)({ nullable: true, description: "Website" })
    ], ProfileInputModel.prototype, "website");
    __decorate([
        (0, graphql_1.Field)({ description: "Birthday" })
    ], ProfileInputModel.prototype, "birthday");
    __decorate([
        (0, graphql_1.Field)(function (type) { return graphql_upload_1.GraphQLUpload; }, { nullable: true, description: "Avatar" })
    ], ProfileInputModel.prototype, "avatar");
    __decorate([
        (0, graphql_1.Field)(function (type) { return graphql_upload_1.GraphQLUpload; }, { nullable: true, description: "Profile background" })
    ], ProfileInputModel.prototype, "profileBackground");
    ProfileInputModel = __decorate([
        (0, graphql_1.InputType)({ description: "Profile" })
    ], ProfileInputModel);
    return ProfileInputModel;
}());
exports.ProfileInputModel = ProfileInputModel;
