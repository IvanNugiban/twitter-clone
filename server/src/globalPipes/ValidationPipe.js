"use strict";
exports.__esModule = true;
var common_1 = require("@nestjs/common");
var common_2 = require("@nestjs/common");
var validationPipe = new common_2.ValidationPipe({
    exceptionFactory: function (errors) {
        return new common_1.BadRequestException(Object.values(errors[0].constraints).toString());
    },
    forbidUnknownValues: false
});
exports["default"] = validationPipe;
