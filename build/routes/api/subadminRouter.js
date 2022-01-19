"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const index_1 = require("../../middlewares/index");
const subadmin_1 = require("../../controllers/subadmin");
const router = express_1.default.Router();
exports.router = router;
router.use((0, index_1.isAuthenticated)('subadmin'));
router.post('/promotion/create', subadmin_1.createPromotion);
router.post('/manger/create', subadmin_1.createManager);
router.post('/category/create', subadmin_1.createCategory);
//# sourceMappingURL=subadminRouter.js.map