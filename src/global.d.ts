import { InferAttributes } from 'sequelize';
import { User as UserModel } from './models/user';

declare global {
  namespace Express {
    export interface User extends InferAttributes<UserModel> {}
  }
}
