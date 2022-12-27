"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var Token = new mongoose_1.Schema({
    userId: String,
    refreshToken: String
});
exports["default"] = Token;
