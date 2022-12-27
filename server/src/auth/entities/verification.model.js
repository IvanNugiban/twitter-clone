"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.VerificationModel = void 0;
var graphql_1 = require("@nestjs/graphql");
var class_validator_1 = require("class-validator");
var VerificationModel = /** @class */ (function () {
    function VerificationModel() {
    }
    __decorate([
        (0, graphql_1.Field)({ description: "User data" })
    ], VerificationModel.prototype, "user");
    __decorate([
        (0, class_validator_1.IsNumber)(),
        (0, class_validator_1.Min)(100000, { message: "Code must be 6 characters long" }),
        (0, class_validator_1.Max)(999999, { message: "Code must be 6 characters long" }),
        (0, graphql_1.Field)({ description: "Verification code" })
    ], VerificationModel.prototype, "code");
    VerificationModel = __decorate([
        (0, graphql_1.ObjectType)({ description: "Verification data" }),
        (0, graphql_1.InputType)()
    ], VerificationModel);
    return VerificationModel;
}());
exports.VerificationModel = VerificationModel;
