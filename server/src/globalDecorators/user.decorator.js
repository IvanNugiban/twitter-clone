"use strict";
exports.__esModule = true;
exports.User = void 0;
var common_1 = require("@nestjs/common");
var graphql_1 = require("@nestjs/graphql");
exports.User = (0, common_1.createParamDecorator)(function (data, ctx) {
    return graphql_1.GqlExecutionContext.create(ctx).getContext().req.user;
});
