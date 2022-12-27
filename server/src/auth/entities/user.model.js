"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.userModel = void 0;
var graphql_1 = require("@nestjs/graphql");
var class_validator_1 = require("class-validator");
var userModel = /** @class */ (function () {
    function userModel() {
    }
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.MinLength)(4, {
            message: "Username must be at least 4 characters long"
        }),
        (0, class_validator_1.MaxLength)(16, {
            message: "Maximum length of username - 16"
        }),
        (0, graphql_1.Field)({ description: "Username" })
    ], userModel.prototype, "username");
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.MinLength)(4, {
            message: "Pseudonym must be at least 4 characters long"
        }),
        (0, class_validator_1.MaxLength)(16, {
            message: "Maximum length of pseudonym - 16"
        }),
        (0, class_validator_1.Matches)(/^[a-zA-Z\d-_]+$/, { message: "Pseudonym can contain only numbers, and latin letters and -, _ symbols" }),
        (0, graphql_1.Field)({ description: "Pseudonym" })
    ], userModel.prototype, "pseudonym");
    __decorate([
        (0, class_validator_1.IsEmail)(undefined, {
            message: "Please make sure you entered the correct email"
        }),
        (0, graphql_1.Field)({ description: "Email" })
    ], userModel.prototype, "email");
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.MinLength)(4, { message: "Password must be longer than or equal to 4 characters " }),
        (0, class_validator_1.MaxLength)(25, { message: "Password must be shorter than or equal to 25 characters" }),
        (0, graphql_1.Field)({ description: "Password" })
    ], userModel.prototype, "password");
    __decorate([
        (0, graphql_1.Field)({ description: "Date of joining", nullable: true })
    ], userModel.prototype, "dateOfJoining");
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.MinLength)(1, { message: "Enter your birthday" }),
        (0, graphql_1.Field)({ description: "Birthday" })
    ], userModel.prototype, "birthday");
    userModel = __decorate([
        (0, graphql_1.ObjectType)({ description: "Auth" }),
        (0, graphql_1.InputType)("UserInput")
    ], userModel);
    return userModel;
}());
exports.userModel = userModel;
