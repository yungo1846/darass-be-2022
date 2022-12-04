import { Model, InferAttributes, InferCreationAttributes, STRING, CreationOptional, DataTypes } from 'sequelize';
import db from '.';
import { sequelize } from './sequelize';

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;
  declare email: string;
  declare name: string;
  declare password: CreationOptional<string>;
  declare provider: CreationOptional<'kakao'>;
  declare snsId: CreationOptional<string>;
  declare profileImage: CreationOptional<string>;

  static associate(DB: typeof db) {
    DB.User.hasMany(DB.Comment, { foreignKey: 'commenterId', as: 'commenter' });
    DB.User.hasMany(DB.Project, { foreignKey: 'ownerId', as: 'owner' });
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: STRING(40),
      allowNull: true,
      unique: true,
    },
    name: {
      type: STRING(20),
      allowNull: false,
    },
    password: {
      type: STRING(100),
      allowNull: true,
    },
    provider: {
      type: STRING(10),
      allowNull: false,
      defaultValue: 'local',
    },
    snsId: {
      type: STRING(30),
      allowNull: true,
    },
    profileImage: {
      type: STRING(200),
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: true,
    underscored: false,
    modelName: 'User',
    tableName: 'users',
    paranoid: true,
    charset: 'utf8',
    collate: 'utf8_general_ci',
  },
);
