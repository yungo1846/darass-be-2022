import express from 'express';

export const commentRouter = express.Router();

commentRouter.get('/', (req, res) => {
  res.status(200).send([
    {
      id: 1,
      commenter: {
        id: 1,
        name: 'kim',
        profileImage:
          'https://w.namu.la/s/b6f7c7b38d46ee00a11fac3266bbfc520f66fc272d75f334848910e0dbb7c9c89cdaa96138d030b75f0e71a2671bfaababc9b1dc333a8da9b07bfc03368d89eb9645cee8702e8b1ccf2c6651340f73621b2b84f6ec0eb31d0f3a394a7665df096026a6c547d46a004d7726e3b8bf0ae0',
      },
      content: {
        body: '댓글 1111',
        createdAt: '2020-05-01 12:00:00',
        updatedAt: '2020-05-01 12:00:00',
      },
    },
  ]);
});
