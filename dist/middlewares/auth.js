"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginNotRequired = exports.loginRequired = void 0;
const user_1 = require("../models/user");
const loginRequired = async (req, res, next) => {
    const email = req.headers['x_auth_email'];
    if (email) {
        const user = await user_1.User.findOne({ where: [{ email }] });
        if (user) {
            req.user = user;
            return next();
        }
    }
    if (req.isAuthenticated()) {
        return next();
    }
    else {
        res.status(403).send('로그인 필요');
    }
};
exports.loginRequired = loginRequired;
const loginNotRequired = (req, res, next) => {
    if (!req.isAuthenticated()) {
        next();
    }
    else {
        res.status(403).send('로그인한 사용자는 접근할 수 없습니다.');
    }
};
exports.loginNotRequired = loginNotRequired;
