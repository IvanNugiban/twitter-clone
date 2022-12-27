"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var User = new mongoose_1.Schema({
    username: { type: String, required: true },
    pseudonym: { type: String, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    birthday: { type: String, required: true },
    dateOfJoining: { type: String, required: true },
    description: String,
    avatar: String,
    profileBackground: String,
    website: String,
    following: { type: [String], "default": [] },
    followers: { type: [String], "default": [] },
    bookmarks: { type: [String], ref: "Tweet", "default": [] },
    likes: {
        type: [{
                ref: String,
                refId: String
            }], "default": []
    }
});
exports["default"] = User;
