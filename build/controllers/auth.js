"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = void 0;
const prisma_1 = require("../lib/prisma");
const catchAsync_1 = require("../utils/catchAsync");
const seal_1 = require("../lib/seal");
const email_1 = require("../utils/email");
const error_1 = require("./error");
exports.login = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { email, user } = req.body;
    let currentUser = null;
    if (user === 'subadmin') {
        currentUser = await prisma_1.prisma.subadmin.findUnique({ where: { email }, include: { center: true } }).catch(_ => _);
    }
    if (user === 'manager') {
        currentUser = await prisma_1.prisma.manager.findUnique({ where: { email } }).catch(_ => _);
    }
    if (!currentUser) {
        return res.status(401).json({ error: error_1.error.email });
    }
    currentUser.role = user;
    currentUser.iat = Date.now();
    const sealData = await (0, seal_1.seal)(currentUser);
    const callback = process.env.AUTH_CALLBACK_URL;
    const url = `${callback}?seal=${sealData}`;
    res.json({ message: 'Check your email to login your account' });
    await (0, email_1.sendEmail)(process.env.TEMP_EMAIL, url);
});
exports.logout = (0, catchAsync_1.catchAsync)(async (req, res) => {
    await req.session.destroy();
    res.json({
        message: 'logged out'
    });
});
//# sourceMappingURL=auth.js.map