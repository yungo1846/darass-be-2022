import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  STRING,
  CreationOptional,
  DataTypes,
  ForeignKey,
} from 'sequelize';
import db from '.';
import { sequelize } from './sequelize';
import { User } from './user';

export class Project extends Model<InferAttributes<Project>, InferCreationAttributes<Project>> {
  declare uuid: typeof DataTypes.UUIDV4;
  declare name: string;
  declare ownerId: ForeignKey<User['id']>;

  static associate(DB: typeof db) {
    DB.Project.belongsTo(DB.User, { foreignKey: 'ownerId', as: 'owner' });
    DB.Project.hasMany(DB.Post, { foreignKey: 'projectId', as: 'project' });
  }
}

Project.init(
  {
    uuid: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: STRING(100),
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    underscored: false,
    modelName: 'Project',
    tableName: 'projects',
    paranoid: true,
    charset: 'utf8',
    collate: 'utf8_general_ci',
  },
);
