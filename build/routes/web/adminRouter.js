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
const cards = [
    {
        title: 'Subadmin',
        description: 'Passwordless login that’s delightful, blazing-fast, and fully customizable',
        color: 'bg-purple-500',
        url: '/admin/dashboard/subadmin'
    },
    {
        title: 'Stastics',
        description: 'Statistics of the Marjane including the number of promotion and others',
        color: 'bg-blue-500',
        url: '/admin/dashboard/stats'
    },
];
router.get('/login', (0, index_1.isAuthenticated)(), (req, res) => {
    res.render('pages/admin/login');
});
router.use((0, index_1.isAuthenticated)('admin'));
router.get('/dashboard', (req, res) => {
    res.render('pages/admin/dashboard', { cards });
});
router.get('/dashboard/stats', async (req, res) => {
    const promotions = await prisma_1.prisma.promotion.findMany({});
    console.log(promotions);
    res.render('pages/admin/stats');
});
router.get('/dashboard/subadmin', async (req, res) => {
    const subadmins = await prisma_1.prisma.subadmin.findMany({
        include: {
            _count: {
                select: {
                    Promotion: true,
                }
            }
        }
    });
    const centers = await prisma_1.prisma.center.findMany({
        select: { id: true, name: true }
    }).catch(_ => _);
    res.render('pages/admin/subadmin', { subadmins, centers });
});
router.get('/operations', async (req, res) => {
    const operations = await prisma_1.prisma.logs.findMany();
    res.json({ operations });
});
router.get('/export', async (req, res) => {
    const operations = await prisma_1.prisma.logs.findMany();
    require('fs').writeFileSync('./operations.json', JSON.stringify(operations));
    res.json({ operations });
});
//# sourceMappingURL=adminRouter.js.map