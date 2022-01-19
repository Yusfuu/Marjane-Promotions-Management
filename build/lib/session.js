"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.session = void 0;
const express_1 = require("iron-session/express");
exports.session = (0, express_1.ironSession)({
    cookieName: "marjan",
    password: process.env.SESSION_SECRET,
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
    },
});
//# sourceMappingURL=session.js.map