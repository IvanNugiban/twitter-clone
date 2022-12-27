"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProfileModel = void 0;
var graphql_1 = require("@nestjs/graphql");
var ProfileModel = /** @class */ (function () {
    function ProfileModel() {
    }
    __decorate([
        (0, graphql_1.Field)({ description: "Username" })
    ], ProfileModel.prototype, "username");
    __decorate([
        (0, graphql_1.Field)({ nullable: true, description: "Description" })
    ], ProfileModel.prototype, "description");
    __decorate([
        (0, graphql_1.Field)({ nullable: true, description: "Website" })
    ], ProfileModel.prototype, "website");
    __decorate([
        (0, graphql_1.Field)({ description: "Birthday" })
    ], ProfileModel.prototype, "birthday");
    __decorate([
        (0, graphql_1.Field)({ nullable: true, description: "Avatar" })
    ], ProfileModel.prototype, "avatar");
    __decorate([
        (0, graphql_1.Field)({ nullable: true, description: "Profile background" })
    ], ProfileModel.prototype, "profileBackground");
    ProfileModel = __decorate([
        (0, graphql_1.ObjectType)({ description: "Profile" })
    ], ProfileModel);
    return ProfileModel;
}());
exports.ProfileModel = ProfileModel;
