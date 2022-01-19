"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const session_1 = require("./lib/session");
const auth_1 = require("./middlewares/auth");
const index_1 = require("./routes/index");
const error_1 = require("./middlewares/error");
const app = (0, express_1.default)();
app.set('view engine', 'ejs');
app.use(express_1.default.json());
app.use(session_1.session);
app.get('/', (req, res) => res.render('pages/home'));
app.get('/account/login', (0, auth_1.isAuthenticated)(), (req, res) => res.render('pages/login'));
app.use('/api/admin', index_1.apiAdminRouter);
app.use('/admin', index_1.adminRouter);
app.use('/api/subadmin', index_1.apiSubadminRouter);
app.use('/subadmin', index_1.subadminRouter);
app.use('/api/manager', index_1.apiManagerRouter);
app.use('/manager', index_1.managerRouter);
app.use('/api/account', index_1.apiAuthRouter);
app.use('/callback', index_1.callbackRouter);
// handling 404 errors and handling internal server errors
app.use(error_1.notFound, error_1.handleError);
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`🚀 Server ready at: ${process.env.APP_HOST}:${port}`);
});
//# sourceMappingURL=app.js.map