"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("./sequelize");
const user_1 = require("./user");
const comment_1 = require("./comment");
const project_1 = require("./project");
const db = {
    sequelize: sequelize_1.sequelize,
    User: user_1.User,
    Comment: comment_1.Comment,
    Project: project_1.Project,
};
exports.default = db;
user_1.User.associate(db);
comment_1.Comment.associate(db);
project_1.Project.associate(db);
