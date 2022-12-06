"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("./sequelize");
class Post extends sequelize_1.Model {
    static associate(DB) {
        DB.Post.belongsTo(DB.Project, { foreignKey: 'projectId', as: 'project' });
        DB.Post.hasMany(DB.Comment, { foreignKey: 'postURL', as: 'post' });
    }
}
exports.Post = Post;
Post.init({
    url: {
        type: sequelize_1.DataTypes.STRING(100),
        primaryKey: true,
    },
}, {
    sequelize: sequelize_2.sequelize,
    timestamps: true,
    underscored: false,
    modelName: 'Post',
    tableName: 'posts',
    paranoid: true,
    charset: 'utf8',
    collate: 'utf8_general_ci',
});
