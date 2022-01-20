"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const session_1 = require("./lib/session");
const auth_1 = require("./middlewares/auth");
const index_1 = require("./routes/index");
const error_1 = require("./middlewares/error");
exports.app = (0, express_1.default)();
exports.app.set('view engine', 'ejs');
exports.app.use(express_1.default.json());
exports.app.use(session_1.session);
exports.app.get('/', (req, res) => res.render('pages/home'));
exports.app.get('/account/login', (0, auth_1.isAuthenticated)(), (req, res) => res.render('pages/login'));
exports.app.use('/api/admin', index_1.apiAdminRouter);
exports.app.use('/admin', index_1.adminRouter);
exports.app.use('/api/subadmin', index_1.apiSubadminRouter);
exports.app.use('/subadmin', index_1.subadminRouter);
exports.app.use('/api/manager', index_1.apiManagerRouter);
exports.app.use('/manager', index_1.managerRouter);
exports.app.use('/api/account', index_1.apiAuthRouter);
exports.app.use('/callback', index_1.callbackRouter);
exports.app.use(error_1.notFound, error_1.handleError);
const port = process.env.PORT || 3000;
exports.app.listen(port, () => {
    console.log(`🚀 Server ready at: ${process.env.APP_HOST}:${port}`);
});
//# sourceMappingURL=app.js.map