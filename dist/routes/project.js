"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middlewares/auth");
const project_1 = require("../models/project");
exports.ProjectRouter = express_1.default.Router();
exports.ProjectRouter.get('/', auth_1.loginRequired, async (req, res) => {
    const projects = await project_1.Project.findAll({
        where: [{ ownerId: req.user?.id }],
        attributes: ['id', 'content', 'createdAt', 'updatedAt'],
    });
    res.status(200).send(projects);
});
exports.ProjectRouter.post('/', auth_1.loginRequired, async (req, res) => {
    const { name, mode } = req.body;
    if (name == null) {
        return res.status(400).send('name이 필요합니다.');
    }
    if (name == null) {
        return res.status(400).send('mode가 필요합니다.');
    }
    const project = await project_1.Project.create({
        name,
        mode,
        ownerId: req.user?.id ?? 1,
    });
    res.status(201).send(project);
});
