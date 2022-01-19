"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const prisma_1 = require("../../lib/prisma");
const index_1 = require("../../middlewares/index");
const router = express_1.default.Router();
exports.router = router;
router.use((0, index_1.isAuthenticated)('manager'));
router.get('/dashboard', (req, res) => {
    const cards = [
        {
            title: 'Promotions',
            description: 'Passwordless login that’s delightful, blazing-fast, and fully customizable',
            color: 'bg-purple-500',
            url: '/manager/dashboard/promotion'
        }
    ];
    res.render('pages/manager/dashboard', { cards });
});
router.get('/dashboard/promotion', async (req, res) => {
    //@ts-ignore
    const { categoryId, centerId } = req.session?.user;
    const confirmation = req?.query?.confirmation || false;
    const promotions = await prisma_1.prisma.promotion.findMany({
        where: {
            product: { categoryId: { equals: categoryId } },
            subadminId: { equals: centerId },
            confirmation: confirmation
        },
        include: {
            product: true
        }
    }).catch(_ => _);
    res.render('pages/manager/promotion', { promotions });
});
//# sourceMappingURL=managerRouter.js.map