import express from "express";

export const pageRouter = express.Router();

pageRouter.use((req, res, next) => {
  res.locals.user = null;
  next();
});

pageRouter.get("/", (req, res, next) => {
  res.status(200);
  res.send("user api");
});
