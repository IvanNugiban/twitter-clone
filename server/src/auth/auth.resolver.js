"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.AuthResolver = void 0;
var graphql_1 = require("@nestjs/graphql");
var user_model_1 = require("./entities/user.model");
var login_model_1 = require("./entities/login.model");
var user_decorator_1 = require("../globalDecorators/user.decorator");
var AuthResolver = /** @class */ (function () {
    function AuthResolver(authService, emailService) {
        this.authService = authService;
        this.emailService = emailService;
    }
    AuthResolver.prototype.refresh = function (context) {
        return __awaiter(this, void 0, void 0, function () {
            var refreshToken, userData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        refreshToken = context.req.cookies.refreshToken;
                        return [4 /*yield*/, this.authService.refresh(refreshToken)];
                    case 1:
                        userData = _a.sent();
                        context.res.cookie("refreshToken", userData.refreshToken, { maxAge: 30 * 24 * 60 * 60, httpOnly: true });
                        delete userData.refreshToken;
                        return [2 /*return*/, userData];
                }
            });
        });
    };
    AuthResolver.prototype.checkRegisterData = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.authService.checkRegisterData(user)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AuthResolver.prototype.checkLoginData = function (emailOrUsername) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.authService.checkLoginData(emailOrUsername)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.email];
                }
            });
        });
    };
    AuthResolver.prototype.checkVerificationCode = function (verificationData, context) {
        return __awaiter(this, void 0, void 0, function () {
            var validationResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.authService.verifyAndRegister(verificationData)];
                    case 1:
                        validationResult = _a.sent();
                        context.res.cookie("refreshToken", validationResult.refreshToken, {
                            maxAge: 30 * 24 * 60 * 1000,
                            httpOnly: true
                        });
                        delete validationResult.refreshToken;
                        return [2 /*return*/, validationResult];
                }
            });
        });
    };
    AuthResolver.prototype.sendVerificationCode = function (email, user) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.emailService.saveAndSendVerificationCode(email)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AuthResolver.prototype.login = function (loginData, context) {
        return __awaiter(this, void 0, void 0, function () {
            var loggedInUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.authService.login(loginData)];
                    case 1:
                        loggedInUser = _a.sent();
                        context.res.cookie("refreshToken", loggedInUser.refreshToken, { maxAge: 30 * 24 * 60 * 60, httpOnly: true });
                        delete loggedInUser.refreshToken;
                        return [2 /*return*/, loggedInUser];
                }
            });
        });
    };
    AuthResolver.prototype.logout = function (context) {
        return __awaiter(this, void 0, void 0, function () {
            var refreshToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        refreshToken = context.req.cookies.refreshToken;
                        context.res.clearCookie("refreshToken");
                        return [4 /*yield*/, this.authService.logout(refreshToken)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    __decorate([
        (0, graphql_1.Query)(function (returns) { return login_model_1.LoginModel; }),
        __param(0, (0, graphql_1.Context)())
    ], AuthResolver.prototype, "refresh");
    __decorate([
        (0, graphql_1.Mutation)(function (returns) { return user_model_1.userModel; }),
        __param(0, (0, graphql_1.Args)("User"))
    ], AuthResolver.prototype, "checkRegisterData");
    __decorate([
        (0, graphql_1.Mutation)(function (returns) { return String; }),
        __param(0, (0, graphql_1.Args)("user", { type: function () { return String; } }))
    ], AuthResolver.prototype, "checkLoginData");
    __decorate([
        (0, graphql_1.Mutation)(function (returns) { return login_model_1.LoginModel; }),
        __param(0, (0, graphql_1.Args)("Verification")),
        __param(1, (0, graphql_1.Context)())
    ], AuthResolver.prototype, "checkVerificationCode");
    __decorate([
        (0, graphql_1.Mutation)(function (returns) { return String; }),
        __param(0, (0, graphql_1.Args)("Email", { type: function () { return String; } })),
        __param(1, (0, user_decorator_1.User)())
    ], AuthResolver.prototype, "sendVerificationCode");
    __decorate([
        (0, graphql_1.Mutation)(function (returns) { return login_model_1.LoginModel; }),
        __param(0, (0, graphql_1.Args)("LoginInput")),
        __param(1, (0, graphql_1.Context)())
    ], AuthResolver.prototype, "login");
    __decorate([
        (0, graphql_1.Mutation)(function (returns) { return graphql_1.ID; }),
        __param(0, (0, graphql_1.Context)())
    ], AuthResolver.prototype, "logout");
    AuthResolver = __decorate([
        (0, graphql_1.Resolver)(function (of) { return user_model_1.userModel; })
    ], AuthResolver);
    return AuthResolver;
}());
exports.AuthResolver = AuthResolver;
