"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../config/config.js')[env];
const sequelize_1 = require("sequelize");
exports.sequelize = new sequelize_1.Sequelize(config.database, config.username, config.password, config);
