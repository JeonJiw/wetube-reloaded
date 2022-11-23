import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStote from "connect-mongo";
import rootRouter from "./routers/rootRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";
import { localsMiddleware } from "./middlewares";

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
//express app이 form의 value를 이해할 수 있게 js로 바꿔줌
app.use(express.urlencoded({ extended: true }));
//사이트로 들어오는 모든 유저를 기억
//서버를 재시작할 때마다 모든 세션이 사라짐
//세션이 생기면 세션 id를 쿠키와 db에 저장해서 비교
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStote.create({ mongoUrl: process.env.DB_URL }),
  })
);
app.use(localsMiddleware);
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("assets"));
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

export default app;
