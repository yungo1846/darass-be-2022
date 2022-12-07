import passport from 'passport';
import { User } from '../models/user';
import { kakaoStrategy } from './kakaoStrategy';
import { localStrategy } from './localStrategy';

export const passportConfig = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: string, done) => {
    try {
      const user = await User.findOne({
        where: { id },
        attributes: ['id', 'email', 'name', 'provider', 'profileImage'],
      });

      done(null, user);
    } catch (err) {
      done(err);
    }
  });

  localStrategy();
  kakaoStrategy();
};
