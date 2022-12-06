"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.localStrategy = void 0;
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const user_1 = require("../models/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
const localStrategy = () => {
    passport_1.default.use(new passport_local_1.Strategy({
        usernameField: 'email',
        passwordField: 'password',
    }, async (email, password, done) => {
        try {
            const user = await user_1.User.findOne({ where: { email } });
            if (user == null) {
                return done(null, false, { message: '존재하지 않는 사용자입니다.' });
            }
            const result = await bcrypt_1.default.compare(password, user.password);
            if (result) {
                return done(null, user);
            }
            return done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
        }
        catch (err) {
            console.error(err);
            return done(err);
        }
    }));
};
exports.localStrategy = localStrategy;
