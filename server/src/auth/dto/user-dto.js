"use strict";
exports.__esModule = true;
exports.UserDto = void 0;
var UserDto = /** @class */ (function () {
    function UserDto(model) {
        this.email = model.email;
        this.username = model.username;
        this.pseudonym = model.pseudonym;
        this.id = model._id;
        this.birthday = model.birthday;
        this.dateOfJoining = model.dateOfJoining;
        this.avatar = model.avatar;
        this.profileBackground = model.profileBackground;
        this.website = model.website;
        this.bookmarks = model.bookmarks;
        this.following = model.following;
        this.followers = model.followers;
        this.likes = model.likes;
        this.description = model.description;
    }
    return UserDto;
}());
exports.UserDto = UserDto;
