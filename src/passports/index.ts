import passport from 'passport';
import { User } from '../models/user';
import { kakaoStrategy } from './kakaoStrategy';
import { localStrategy } from './localStrategy';

export const passportConfig = () => {
  passport.serializeUser((user, done) => {
    done(null, user.email);
  });

  passport.deserializeUser(async (email: string, done) => {
    try {
      const user = await User.findOne({ where: { email } });

      if (user == null) return;

      done(null, user);
    } catch (err) {
      done(err);
    }
  });

  localStrategy();
  kakaoStrategy();
};
