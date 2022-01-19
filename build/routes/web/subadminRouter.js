"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const index_1 = require("../../middlewares/index");
const prisma_1 = require("../../lib/prisma");
const router = express_1.default.Router();
exports.router = router;
router.use((0, index_1.isAuthenticated)('subadmin'));
router.get('/dashboard', (req, res) => {
    const cards = [
        {
            title: 'Manager',
            description: 'Passwordless login that’s delightful, blazing-fast, and fully customizable',
            color: 'bg-purple-500',
            url: '/subadmin/dashboard/manger'
        },
        {
            title: 'Promotions',
            description: 'Passwordless login that’s delightful, blazing-fast, and fully customizable',
            color: 'bg-blue-400',
            url: '/subadmin/dashboard/promotion'
        },
        {
            title: 'Category',
            description: 'Passwordless login that’s delightful, blazing-fast, and fully customizable',
            color: 'bg-green-400',
            url: '/subadmin/dashboard/category'
        }
    ];
    res.render('pages/subadmin/dashboard', { cards });
});
router.get('/dashboard/manger', async (req, res) => {
    // @ts-ignore
    const { id } = req.session.user;
    const managers = await prisma_1.prisma.manager.findMany({
        where: { subadminId: id }
    });
    const categories = await prisma_1.prisma.category.findMany({
        select: { id: true, name: true }
    });
    res.render('pages/subadmin/manager', { managers, categories });
});
router.get('/dashboard/category', async (req, res) => {
    const categories = await prisma_1.prisma.category.findMany({
        include: {
            _count: {
                select: {
                    products: true
                }
            }
        }
    });
    res.render('pages/subadmin/category', { categories });
});
router.get('/dashboard/promotion', async (req, res) => {
    //@ts-ignore
    const { id } = req.session.user;
    const promotions = await prisma_1.prisma.promotion.findMany({
        where: {
            subadminId: id
        },
        include: {
            product: {
                include: {
                    Category: true
                }
            }
        }
    });
    res.render('pages/subadmin/promotion', { promotions });
});
router.get('/promotions', async (req, res) => {
    // @ts-ignore
    const { id } = req.session.user;
    const promotions = await prisma_1.prisma.promotion.findMany({
        where: {
            subadminId: id
        },
        include: {
            product: {
                include: {
                    Category: true
                }
            }
        }
    });
    res.json({ promotions });
});
//# sourceMappingURL=subadminRouter.js.map