"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middlewares/auth");
const user_1 = require("../models/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
const passport_1 = __importDefault(require("passport"));
exports.authRouter = express_1.default.Router();
exports.authRouter.post('/join', auth_1.loginNotRequired, async (req, res, next) => {
    const { email, name, password } = req.body;
    try {
        const exUser = await user_1.User.findOne({
            where: {
                email,
            },
        });
        if (exUser) {
            return res.status(403).send('이미 사용중인 이메일입니다.');
        }
        const hash = await bcrypt_1.default.hash(password, 12);
        await user_1.User.create({
            email,
            name,
            password: hash,
        });
        res.status(200).send('ok');
    }
    catch (err) {
        console.error(err);
        next(err);
    }
});
exports.authRouter.post('/login', auth_1.loginNotRequired, (req, res, next) => {
    passport_1.default.authenticate('local', (authError, user, info) => {
        if (authError) {
            console.error(authError);
            return next(authError);
        }
        if (!user) {
            return res.status(401).send(info.message);
        }
        return req.login(user, (loginError) => {
            if (loginError) {
                console.error(loginError);
                return next(loginError);
            }
            return res.status(200).send('ok');
        });
    })(req, res, next);
});
exports.authRouter.get('/logout', auth_1.loginRequired, (req, res) => {
    req.logout({}, (err) => {
        console.error(err);
        res.status(400).send('로그아웃 실패');
    });
    req.session.destroy((err) => {
        console.error(err);
        res.status(400).send('로그아웃 실패(세션)');
    });
    res.status(200).send('ok');
    res.redirect('http://localhost:3000');
});
exports.authRouter.get('/kakao', passport_1.default.authenticate('kakao'));
exports.authRouter.get('/kakao/callback', passport_1.default.authenticate('kakao', {
    failureRedirect: '/',
}), (req, res) => {
    res.redirect('http://localhost:3000/oauth/success');
});
