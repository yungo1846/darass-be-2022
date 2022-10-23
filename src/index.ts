import express from "express";
import morgan from "morgan";
import path from "path";
import cookieParser from "cookie-parser";
import session from "express-session";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.set("port", process.env.PORT || 8000);
app.use(express.json());

app.use(morgan("dev"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET ?? "secret",
    cookie: {
      httpOnly: true,
      secure: true,
    },
  })
);

app.use((req, res, next) => {
  res.status(404);
  res.send("404 Not Found");
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});
