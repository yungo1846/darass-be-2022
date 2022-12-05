import { RequestHandler } from 'express';
import { User } from '../models/user';

export const loginRequired: RequestHandler = async (req, res, next) => {
  const email = req.headers['x_auth_email'];

  if (email) {
    const user = await User.findOne({ where: [{ email }] });

    if (user) {
      req.user = user;
      return next();
    }
  }

  if (req.isAuthenticated()) {
    return next();
  } else {
    res.status(403).send('로그인 필요');
  }
};

export const loginNotRequired: RequestHandler = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.status(403).send('로그인한 사용자는 접근할 수 없습니다.');
  }
};
