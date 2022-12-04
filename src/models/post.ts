import { DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import db from '.';
import { Project } from './project';
import { sequelize } from './sequelize';

export class Post extends Model<InferAttributes<Post>, InferCreationAttributes<Post>> {
  declare url: string;
  declare projectId: ForeignKey<Project['id']>;

  static associate(DB: typeof db) {
    DB.Post.belongsTo(DB.Project, { foreignKey: 'projectId', as: 'project' });
  }
}

Post.init(
  {
    url: {
      type: DataTypes.STRING(100),
      autoIncrement: true,
      primaryKey: true,
    },
  },
  {
    sequelize,
    timestamps: true,
    underscored: false,
    modelName: 'Post',
    tableName: 'posts',
    paranoid: true,
    charset: 'utf8',
    collate: 'utf8_general_ci',
  },
);
