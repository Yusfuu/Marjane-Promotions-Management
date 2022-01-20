"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.callback = void 0;
const seal_1 = require("../lib/seal");
const catchAsync_1 = require("../utils/catchAsync");
exports.callback = (0, catchAsync_1.catchAsync)(async (req, res) => {
    if (!req.query)
        res.json({ ok: false });
    const seal = await (0, seal_1.unseal)(req.query.seal);
    req.session.user = { ...seal };
    await req.session.save();
    if (seal.role === 'subadmin') {
        return res.redirect('/subadmin/dashboard');
    }
    if (seal.role === 'manager') {
        return res.redirect('/manager/dashboard');
    }
    res.json(seal);
});
//# sourceMappingURL=callback.js.map