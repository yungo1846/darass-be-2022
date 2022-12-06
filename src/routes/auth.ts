import express from 'express';
import { loginNotRequired, loginRequired } from '../middlewares/auth';
import { User } from '../models/user';
import bcrypt from 'bcrypt';
import passport from 'passport';

export const authRouter = express.Router();

authRouter.post('/join', loginNotRequired, async (req, res, next) => {
  const { email, name, password } = req.body;

  try {
    const exUser = await User.findOne({
      where: {
        email,
      },
    });

    if (exUser) {
      return res.status(403).send('이미 사용중인 이메일입니다.');
    }

    const hash = await bcrypt.hash(password, 12);

    await User.create({
      email,
      name,
      password: hash,
    });

    res.status(200).send('ok');
  } catch (err) {
    console.error(err);
    next(err);
  }
});

authRouter.post('/login', loginNotRequired, (req, res, next) => {
  passport.authenticate('local', (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }

    if (!user) {
      return res.status(401).send(info.message);
    }

    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }

      return res.status(200).send('ok');
    });
  })(req, res, next);
});

authRouter.get('/logout', loginRequired, (req, res) => {
  req.logout({}, (err) => {
    console.error(err);
    res.status(400).send('로그아웃 실패');
  });
  req.session.destroy((err) => {
    console.error(err);
    res.status(400).send('로그아웃 실패(세션)');
  });
  res.status(200).send('ok');
  res.redirect('http://localhost:3000');
});

authRouter.get('/kakao', passport.authenticate('kakao'));
authRouter.get(
  '/kakao/callback',
  passport.authenticate('kakao', {
    failureRedirect: '/',
  }),
  (req, res) => {
    res.redirect('http://localhost:3000/oauth/success');
  },
);
