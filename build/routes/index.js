"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiManagerRouter = exports.apiSubadminRouter = exports.apiAuthRouter = exports.apiAdminRouter = exports.callbackRouter = exports.managerRouter = exports.subadminRouter = exports.adminRouter = void 0;
// web routes
var adminRouter_1 = require("./web/adminRouter");
Object.defineProperty(exports, "adminRouter", { enumerable: true, get: function () { return adminRouter_1.router; } });
var subadminRouter_1 = require("./web/subadminRouter");
Object.defineProperty(exports, "subadminRouter", { enumerable: true, get: function () { return subadminRouter_1.router; } });
var managerRouter_1 = require("./web/managerRouter");
Object.defineProperty(exports, "managerRouter", { enumerable: true, get: function () { return managerRouter_1.router; } });
// api routes
var callbackRouter_1 = require("./api/callbackRouter");
Object.defineProperty(exports, "callbackRouter", { enumerable: true, get: function () { return callbackRouter_1.router; } });
var adminRouter_2 = require("./api/adminRouter");
Object.defineProperty(exports, "apiAdminRouter", { enumerable: true, get: function () { return adminRouter_2.router; } });
var AuthRouter_1 = require("./api/AuthRouter");
Object.defineProperty(exports, "apiAuthRouter", { enumerable: true, get: function () { return AuthRouter_1.router; } });
var subadminRouter_2 = require("./api/subadminRouter");
Object.defineProperty(exports, "apiSubadminRouter", { enumerable: true, get: function () { return subadminRouter_2.router; } });
var managerRouter_2 = require("./api/managerRouter");
Object.defineProperty(exports, "apiManagerRouter", { enumerable: true, get: function () { return managerRouter_2.router; } });
//# sourceMappingURL=index.js.map