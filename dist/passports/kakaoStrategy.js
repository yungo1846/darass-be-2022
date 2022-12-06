"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.kakaoStrategy = void 0;
const passport_1 = __importDefault(require("passport"));
const passport_kakao_1 = require("passport-kakao");
const user_1 = require("../models/user");
const kakaoStrategy = () => {
    passport_1.default.use(new passport_kakao_1.Strategy({
        clientID: process.env.KAKAO_ID ?? '',
        callbackURL: '/v1/auth/kakao/callback',
        passReqToCallback: true,
    }, async (req, accessToken, refreshToken, profile, done) => {
        try {
            const user = await user_1.User.findOne({ where: { snsId: profile.id, provider: 'kakao' } });
            if (user) {
                done(null, user);
            }
            else {
                const newUser = await user_1.User.create({
                    email: profile._json?.kakao_account?.email ?? null,
                    name: profile.displayName,
                    snsId: profile.id,
                    provider: 'kakao',
                });
                done(null, newUser);
            }
        }
        catch (err) {
            console.error(err);
            done(err);
        }
    }));
};
exports.kakaoStrategy = kakaoStrategy;
