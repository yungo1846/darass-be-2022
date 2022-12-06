"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("./sequelize");
class User extends sequelize_1.Model {
    static associate(DB) {
        DB.User.hasMany(DB.Comment, { foreignKey: 'commenterId', as: 'commenter' });
        DB.User.hasMany(DB.Project, { foreignKey: 'ownerId', as: 'owner' });
    }
}
exports.User = User;
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: (0, sequelize_1.STRING)(40),
        allowNull: true,
        unique: true,
    },
    name: {
        type: (0, sequelize_1.STRING)(20),
        allowNull: false,
    },
    password: {
        type: (0, sequelize_1.STRING)(100),
        allowNull: true,
    },
    provider: {
        type: (0, sequelize_1.STRING)(10),
        allowNull: false,
        defaultValue: 'local',
    },
    snsId: {
        type: (0, sequelize_1.STRING)(30),
        allowNull: true,
    },
    profileImage: {
        type: (0, sequelize_1.STRING)(200),
        allowNull: true,
    },
}, {
    sequelize: sequelize_2.sequelize,
    timestamps: true,
    underscored: false,
    modelName: 'User',
    tableName: 'users',
    paranoid: true,
    charset: 'utf8',
    collate: 'utf8_general_ci',
});
