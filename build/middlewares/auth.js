"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const isAuthenticated = (entity = null) => (req, res, next) => {
    const user = req.session.user;
    if (!entity) {
        const path = req.path;
        if (user && path === '/account/login') {
            return res.redirect(`/${user.role}/dashboard`);
        }
        else {
            return next();
        }
    }
    if (!user) {
        return res.redirect(`/`);
    }
    if (user?.role !== entity) {
        return res.render('pages/_403');
    }
    next();
};
exports.isAuthenticated = isAuthenticated;
//# sourceMappingURL=auth.js.map