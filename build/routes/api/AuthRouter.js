"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const email_1 = require("../../utils/email");
const prisma_1 = require("../../lib/prisma");
const seal_1 = require("../../lib/seal");
const router = express_1.default.Router();
exports.router = router;
const error = {
    email: 'The email you entered doesn\'t belong to an account. Please check your email and try again.',
    password: 'Sorry, your password was incorrect. Please double-check your password.',
    missing: 'Sorry, you are missing some required fields. Please try again.',
};
router.post('/login', async (req, res) => {
    const { email, user } = req.body;
    const _prisma = {
        manager: prisma_1.prisma.manager,
        subadmin: prisma_1.prisma.subadmin,
    };
    const currentUser = await _prisma[user].findUnique({ where: { email } }).catch(_ => _);
    if (!currentUser) {
        return res.status(401).json({ error: error.email });
    }
    currentUser.role = user;
    currentUser.iat = Date.now();
    const sealData = await (0, seal_1.seal)(currentUser);
    const callback = process.env.AUTH_CALLBACK_URL;
    const url = `${callback}?seal=${sealData}`;
    await (0, email_1.sendEmail)(process.env.TEMP_EMAIL, url);
    res.json({ message: 'Check your email to login your account' });
});
router.post('/logout', async (req, res) => {
    await req.session.destroy();
    res.json({
        message: 'logged out'
    });
});
//# sourceMappingURL=AuthRouter.js.map