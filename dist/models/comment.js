"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("./sequelize");
class Comment extends sequelize_1.Model {
    static associate(DB) {
        DB.Comment.belongsTo(DB.User, { foreignKey: 'commenterId', as: 'commenter' });
        DB.Comment.belongsTo(DB.Project, { foreignKey: 'projectId', as: 'project' });
    }
}
exports.Comment = Comment;
Comment.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    content: {
        type: (0, sequelize_1.STRING)(1000),
        allowNull: false,
    },
    url: {
        type: (0, sequelize_1.STRING)(100),
        allowNull: false,
    },
}, {
    sequelize: sequelize_2.sequelize,
    timestamps: true,
    underscored: false,
    modelName: 'Comment',
    tableName: 'comments',
    paranoid: true,
    charset: 'utf8',
    collate: 'utf8_general_ci',
});
