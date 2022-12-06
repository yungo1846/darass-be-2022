"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middlewares/auth");
const comment_1 = require("../models/comment");
const project_1 = require("../models/project");
const user_1 = require("../models/user");
exports.commentRouter = express_1.default.Router();
exports.commentRouter.get('/', async (req, res) => {
    const url = req.query.url;
    const projectId = req.query.projectId;
    if (typeof url !== 'string') {
        return res.status(400).send('url query가 필요합니다.');
    }
    if (typeof projectId !== 'string') {
        return res.status(400).send('projectId query가 필요합니다.');
    }
    const project = await project_1.Project.findOne({ where: [{ id: projectId }] });
    if (project === null) {
        return res.status(404).send('존재하지 않는 프로젝트 입니다.');
    }
    const comments = await comment_1.Comment.findAll({
        where: { url, projectId },
        include: [
            {
                model: user_1.User,
                as: 'commenter',
                attributes: ['id', 'email', 'name', 'provider', 'profileImage'],
            },
        ],
        attributes: ['id', 'content', 'createdAt', 'updatedAt'],
    });
    res.status(200).send(comments);
});
exports.commentRouter.post('/', auth_1.loginRequired, async (req, res) => {
    const { content, url, projectId } = req.body;
    const project = await project_1.Project.findOne({ where: [{ id: projectId }] });
    if (project === null) {
        return res.status(404).send('존재하지 않는 프로젝트 입니다.');
    }
    const comment = await comment_1.Comment.create({
        content,
        commenterId: req.user?.id ?? 1,
        url,
        projectId,
    });
    res.status(201).send(comment);
});
