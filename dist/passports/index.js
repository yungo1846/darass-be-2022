"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.passportConfig = void 0;
const passport_1 = __importDefault(require("passport"));
const user_1 = require("../models/user");
const kakaoStrategy_1 = require("./kakaoStrategy");
const localStrategy_1 = require("./localStrategy");
const passportConfig = () => {
    passport_1.default.serializeUser((user, done) => {
        done(null, user.email);
    });
    passport_1.default.deserializeUser(async (email, done) => {
        try {
            const user = await user_1.User.findOne({
                where: { email },
                attributes: ['id', 'email', 'name', 'provider', 'profileImage'],
            });
            if (user == null)
                return;
            done(null, user);
        }
        catch (err) {
            done(err);
        }
    });
    (0, localStrategy_1.localStrategy)();
    (0, kakaoStrategy_1.kakaoStrategy)();
};
exports.passportConfig = passportConfig;
