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
// render login page for admin
router.get('/login', (0, index_1.isAuthenticated)(), (req, res) => {
    res.render('pages/admin/login');
});
router.use((0, index_1.isAuthenticated)('admin'));
// render dashboard page for admin
router.get('/dashboard', (req, res) => {
    const { action } = req.query;
    if (action === 'create') {
        res.render('pages/admin/create');
    }
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
    res.render('pages/admin/subadmin', { subadmins });
});
//# sourceMappingURL=adminRouter.js.map