"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Project = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("./sequelize");
class Project extends sequelize_1.Model {
    static associate(DB) {
        DB.Project.belongsTo(DB.User, { foreignKey: 'ownerId', as: 'owner' });
        DB.Project.hasMany(DB.Comment, { foreignKey: 'projectId', as: 'project' });
    }
}
exports.Project = Project;
Project.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: (0, sequelize_1.STRING)(100),
        allowNull: false,
    },
    mode: {
        type: sequelize_1.DataTypes.ENUM('CHAT', 'REPLY'),
        allowNull: false,
    },
}, {
    sequelize: sequelize_2.sequelize,
    timestamps: true,
    underscored: false,
    modelName: 'Project',
    tableName: 'projects',
    paranoid: true,
    charset: 'utf8',
    collate: 'utf8_general_ci',
});
