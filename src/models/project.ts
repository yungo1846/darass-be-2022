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
  declare id: CreationOptional<string>;
  declare name: string;
  declare mode: 'CHAT' | 'REPLY';
  declare ownerId: ForeignKey<User['id']>;

  static associate(DB: typeof db) {
    DB.Project.belongsTo(DB.User, { foreignKey: 'ownerId', as: 'owner' });
    DB.Project.hasMany(DB.Comment, { foreignKey: 'projectId', as: 'project' });
  }
}

Project.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: STRING(100),
      allowNull: false,
    },
    mode: {
      type: DataTypes.ENUM('CHAT', 'REPLY'),
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
