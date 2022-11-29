import passport from 'passport';
import { Strategy } from 'passport-kakao';
import { User } from '../models/user';

export const kakaoStrategy = () => {
  passport.use(
    new Strategy(
      {
        clientID: process.env.KAKAO_ID ?? '',
        callbackURL: '/v1/auth/kakao/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const user = await User.findOne({ where: { snsId: profile.id, provider: 'kakao' } });

          if (user) {
            done(null, user);
          } else {
            const newUser = await User.create({
              email: profile._json?.kakao_account?.email ?? null,
              name: profile.displayName,
              snsId: profile.id,
              provider: 'kakao',
            });

            done(null, newUser);
          }
        } catch (err) {
          console.error(err);
          done(err);
        }
      },
    ),
  );
};
