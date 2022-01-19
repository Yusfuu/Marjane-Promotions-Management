"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const index_1 = require("../../middlewares/index");
const admin_1 = require("../../controllers/admin");
const router = express_1.default.Router();
exports.router = router;
router.post('/login', admin_1.login);
router.use((0, index_1.isAuthenticated)('admin'));
router.post('/create', admin_1.createSubadmin);
router.post('/subadmin/delete', admin_1.deleteSubadmin);
//# sourceMappingURL=adminRouter.js.map