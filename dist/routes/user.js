"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middlewares/auth");
exports.userRouter = express_1.default.Router();
exports.userRouter.get('/profile', auth_1.loginRequired, (req, res) => {
    res.status(200).send(req.user);
});
exports.userRouter.get('/', (req, res, next) => {
    res.status(200).send(req.user);
});
