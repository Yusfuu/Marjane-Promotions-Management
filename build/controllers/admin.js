"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSubadmin = exports.createSubadmin = exports.login = void 0;
const prisma_1 = require("../lib/prisma");
const catchAsync_1 = require("../utils/catchAsync");
const email_1 = require("../utils/email");
const seal_1 = require("../lib/seal");
const error_1 = require("./error");
exports.login = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { email, password } = req.body;
    const user = await prisma_1.prisma.admin.findUnique({ where: { email } }).catch(_ => _);
    if (!user) {
        return res.status(401).json({ error: error_1.error.email });
    }
    if (user.password !== password) {
        return res.status(401).json({ error: error_1.error.password });
    }
    req.session.user = { id: user.id, role: 'admin' };
    await req.session.save();
    res.json({ ok: true });
});
exports.createSubadmin = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { email, name, centerId } = req.body;
    const subadmin = await prisma_1.prisma.subadmin.create({
        data: {
            email, name,
            center: { connect: { id: centerId } },
        },
        include: {
            center: true
        }
    }).catch(_ => _);
    const code = subadmin?.code || null;
    if (code === "P2003" || code === "P2018") {
        return res.status(400).json({ error: 'Center does not exist' });
    }
    if (code === "P2002") {
        return res.status(400).json({ error: 'subadmin already exists' });
    }
    subadmin.role = 'subadmin';
    const sealData = await (0, seal_1.seal)(subadmin);
    const callback = process.env.AUTH_CALLBACK_URL;
    const url = `${callback}?seal=${sealData}`;
    res.json({ message: 'Subadmin created successfully' });
    return await (0, email_1.sendEmail)(process.env.TEMP_EMAIL, url);
});
exports.deleteSubadmin = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { subadminId } = req.body;
    const deleted = await prisma_1.prisma.subadmin.delete({ where: { id: subadminId } }).catch(_ => _);
    res.json({
        data: deleted,
        message: 'Subadmin deleted successfully',
    });
});
//# sourceMappingURL=admin.js.map