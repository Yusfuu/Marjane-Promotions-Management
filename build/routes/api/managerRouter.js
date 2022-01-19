"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const index_1 = require("../../middlewares/index");
const manager_1 = require("../../controllers/manager");
const router = express_1.default.Router();
exports.router = router;
router.use((0, index_1.isAuthenticated)('manager'));
router.post('/promotion/confirm', manager_1.confirmPromotion);
//# sourceMappingURL=managerRouter.js.map