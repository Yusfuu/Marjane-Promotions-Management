"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmPromotion = void 0;
const prisma_1 = require("../lib/prisma");
const catchAsync_1 = require("../utils/catchAsync");
exports.confirmPromotion = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { promotionId, confirmation } = { ...req.body };
    const updatePromotion = await prisma_1.prisma.promotion.update({
        where: { id: promotionId },
        data: { confirmation }
    }).catch(_ => _);
    res.json({ message: 'Promotion updated successfully', updatePromotion });
});
//# sourceMappingURL=manager.js.map