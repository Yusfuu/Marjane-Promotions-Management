"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCategory = exports.createManager = exports.createPromotion = void 0;
const prisma_1 = require("../lib/prisma");
const seal_1 = require("../lib/seal");
const catchAsync_1 = require("../utils/catchAsync");
const email_1 = require("../utils/email");
exports.createPromotion = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const body = { ...req.body };
    const { productId, discount, duration } = body;
    const product = await prisma_1.prisma.product.findUnique({ where: { id: productId }, include: { Promotion: true, Category: true } }).catch(_ => _);
    if (!product) {
        return res.status(400).json({ error: 'Product does not exist' });
    }
    if (product.Promotion) {
        return res.status(400).json({ error: 'Product already has a promotion' });
    }
    if (discount > 50) {
        return res.status(400).json({ error: 'Discount cannot be more than 50' });
    }
    if (product.Category.name === 'Multimedia' && discount > 20) {
        return res.status(400).json({ error: 'Discount cannot be more than 20 for Multimedia' });
    }
    //@ts-ignore
    const { id } = req.session.user;
    const promotion = await prisma_1.prisma.promotion.create({
        data: {
            discount: +discount,
            productId,
            duration: +duration,
            subadminId: id,
            FidelityCard: (+discount / 5) * 50
        }
    });
    res.json({ message: 'Promotion created successfully', promotion });
});
exports.createManager = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { email, name, categoryId } = req.body;
    //@ts-ignore
    const { id, center } = req.session.user;
    const manager = {
        email,
        name,
        categoryId,
        centerId: center[0].id,
        subadminId: id
    };
    const mangerCreated = await prisma_1.prisma.manager.create({ data: manager }).catch(_ => _);
    if (mangerCreated?.code === "P2003") {
        return res.status(400).json({ error: 'Category does not exist' });
    }
    if (mangerCreated?.code === "P2002") {
        return res.status(400).json({ error: 'Category already has a subadmin' });
    }
    mangerCreated.role = 'manager';
    const sealData = await (0, seal_1.seal)(mangerCreated);
    const callback = process.env.AUTH_CALLBACK_URL;
    const url = `${callback}?seal=${sealData}`;
    res.json({ message: 'manager created successfully' });
    return await (0, email_1.sendEmail)(process.env.TEMP_EMAIL, url);
});
exports.createCategory = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { name } = req.body;
    const category = await prisma_1.prisma.category.create({ data: { name } }).catch(_ => _);
    if (category?.code === "P2002") {
        return res.status(400).json({ error: 'Category already exists' });
    }
    return res.json({ message: 'Category created successfully' });
});
//# sourceMappingURL=subadmin.js.map