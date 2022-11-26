import { RequestHandler } from 'express';

export const loginRequired: RequestHandler = (req, res, next) => {
  console.log('login require');
  if (req.isAuthenticated()) {
    next();
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
