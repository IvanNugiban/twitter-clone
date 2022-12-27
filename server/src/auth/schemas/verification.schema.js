"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var Verification = new mongoose_1.Schema({
    code: { type: Number, maxlength: 6, required: true },
    forEmail: { type: String, required: true },
    expiresIn: { type: Date, required: true }
}, { timestamps: true });
Verification.index({ createdAt: 1 }, { expireAfterSeconds: 600 });
exports["default"] = Verification;
