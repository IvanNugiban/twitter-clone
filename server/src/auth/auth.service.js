"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.AuthService = void 0;
var common_1 = require("@nestjs/common");
var bcrypt = require("bcrypt");
var mongoose_1 = require("@nestjs/mongoose");
var user_dto_1 = require("./dto/user-dto");
var AuthService = /** @class */ (function () {
    function AuthService(tokensService, emailService, userSchema, verificationSchema) {
        this.tokensService = tokensService;
        this.emailService = emailService;
        this.userSchema = userSchema;
        this.verificationSchema = verificationSchema;
    }
    AuthService.prototype.getByEmail = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.userSchema.findOne({ email: email })];
            });
        });
    };
    AuthService.prototype.getByPseudonym = function (pseudonym) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.userSchema.findOne({ pseudonym: pseudonym })];
            });
        });
    };
    AuthService.prototype.refresh = function (refreshToken) {
        return __awaiter(this, void 0, void 0, function () {
            var errorMessage, validatedToken, tokenFromDatabase, user, userDto, tokens;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        errorMessage = "User not authorized";
                        if (!refreshToken)
                            throw new common_1.HttpException(errorMessage, common_1.HttpStatus.UNAUTHORIZED);
                        return [4 /*yield*/, this.tokensService.validateToken(refreshToken, process.env.REFRESH_KEY)];
                    case 1:
                        validatedToken = _a.sent();
                        return [4 /*yield*/, this.tokensService.findRefreshToken(refreshToken)];
                    case 2:
                        tokenFromDatabase = _a.sent();
                        if (!validatedToken || !tokenFromDatabase)
                            throw new common_1.HttpException(errorMessage, common_1.HttpStatus.UNAUTHORIZED);
                        return [4 /*yield*/, this.userSchema.findById(validatedToken.id)];
                    case 3:
                        user = _a.sent();
                        userDto = new user_dto_1.UserDto(user);
                        return [4 /*yield*/, this.tokensService.generateAndSaveTokens(userDto)];
                    case 4:
                        tokens = _a.sent();
                        return [2 /*return*/, __assign(__assign({}, userDto), tokens)];
                }
            });
        });
    };
    AuthService.prototype.checkRegisterData = function (userToRegister) {
        return __awaiter(this, void 0, void 0, function () {
            var user, possiblePseudonym;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getByEmail(userToRegister.email)];
                    case 1:
                        user = _a.sent();
                        if (user)
                            throw new common_1.HttpException("User with this email already exist", common_1.HttpStatus.BAD_REQUEST);
                        return [4 /*yield*/, this.getByPseudonym(userToRegister.pseudonym)];
                    case 2:
                        possiblePseudonym = _a.sent();
                        if (possiblePseudonym)
                            throw new common_1.HttpException("User with this pseudonym already exist", common_1.HttpStatus.BAD_REQUEST);
                        return [4 /*yield*/, this.emailService.saveAndSendVerificationCode(userToRegister.email)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, userToRegister];
                }
            });
        });
    };
    AuthService.prototype.checkLoginData = function (emailOrUsername) {
        return __awaiter(this, void 0, void 0, function () {
            var userData, possibleEmail, possiblePseudonym;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userSchema.findOne({ email: emailOrUsername }).lean()];
                    case 1:
                        possibleEmail = _a.sent();
                        return [4 /*yield*/, this.userSchema.findOne({ pseudonym: emailOrUsername }).lean()];
                    case 2:
                        possiblePseudonym = _a.sent();
                        if (possibleEmail)
                            userData = possibleEmail;
                        else if (possiblePseudonym)
                            userData = possiblePseudonym;
                        else
                            throw new common_1.HttpException("We couldn't find your account.", common_1.HttpStatus.BAD_REQUEST);
                        return [2 /*return*/, userData];
                }
            });
        });
    };
    AuthService.prototype.verifyAndRegister = function (verificationData) {
        return __awaiter(this, void 0, void 0, function () {
            var verificationCodes, sortedCodes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(verificationData);
                        return [4 /*yield*/, this.verificationSchema.find({ forEmail: verificationData.user.email })];
                    case 1:
                        verificationCodes = _a.sent();
                        if (verificationCodes.length === 0)
                            throw new common_1.HttpException("Verification code has expired. Try to resend the code", common_1.HttpStatus.GONE);
                        sortedCodes = verificationCodes.sort(function (codeA, codeB) {
                            return codeB.expiresIn.getTime() - codeA.expiresIn.getTime();
                        });
                        if (sortedCodes[0].code !== verificationData.code)
                            throw new common_1.HttpException("The code is incorrect or has already expired", common_1.HttpStatus.BAD_REQUEST);
                        return [4 /*yield*/, this.register(verificationData.user)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AuthService.prototype.register = function (userToRegister) {
        return __awaiter(this, void 0, void 0, function () {
            var hashedPassword, newUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.checkRegisterData(userToRegister)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, bcrypt.hash(userToRegister.password, Number(process.env.HASH_SALT))];
                    case 2:
                        hashedPassword = _a.sent();
                        return [4 /*yield*/, this.userSchema.create(__assign(__assign({}, userToRegister), { password: hashedPassword }))];
                    case 3:
                        newUser = _a.sent();
                        return [4 /*yield*/, this.login({
                                emailOrUsername: newUser.email,
                                password: userToRegister.password
                            })];
                    case 4: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AuthService.prototype.login = function (loginData) {
        return __awaiter(this, void 0, void 0, function () {
            var userData, ifPasswordEquals, userDto, tokens;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.checkLoginData(loginData.emailOrUsername)];
                    case 1:
                        userData = _a.sent();
                        return [4 /*yield*/, bcrypt.compare(loginData.password, userData.password)];
                    case 2:
                        ifPasswordEquals = _a.sent();
                        if (!ifPasswordEquals)
                            throw new common_1.HttpException("We can't log you in. Please, check data correctness and try again", common_1.HttpStatus.BAD_REQUEST);
                        userDto = new user_dto_1.UserDto(userData);
                        return [4 /*yield*/, this.tokensService.generateAndSaveTokens(userDto)];
                    case 3:
                        tokens = _a.sent();
                        return [2 /*return*/, __assign(__assign({}, userDto), tokens)];
                }
            });
        });
    };
    AuthService.prototype.logout = function (refreshToken) {
        return __awaiter(this, void 0, void 0, function () {
            var validatedToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!refreshToken)
                            throw new common_1.HttpException("User isn't authorized", common_1.HttpStatus.UNAUTHORIZED);
                        return [4 /*yield*/, this.tokensService.validateToken(refreshToken, process.env.REFRESH_KEY)];
                    case 1:
                        validatedToken = _a.sent();
                        if (!validatedToken)
                            throw new common_1.HttpException("User isn't authorized", common_1.HttpStatus.UNAUTHORIZED);
                        return [4 /*yield*/, this.tokensService.deleteToken(validatedToken.id)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, validatedToken.id];
                }
            });
        });
    };
    AuthService = __decorate([
        (0, common_1.Injectable)(),
        __param(2, (0, mongoose_1.InjectModel)("User")),
        __param(3, (0, mongoose_1.InjectModel)("Verification"))
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
