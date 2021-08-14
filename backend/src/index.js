import Koa from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import api from "./api/index.js";
import mongoose from "mongoose";
import jwtMiddleware from "./lib/jwtMiddleware.js";

// import dotdev from "dotenv";
// dotenv.config();

// const { PORT, MONGO_URI } = process.env;
const port = 4000;
const MONGO_URI = "mongodb://localhost:27017/movie";

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connect to MongoDB");
  })
  .catch((e) => {
    console.log(e);
  });
const app = new Koa();
const router = new Router();

router.use("/api", api.routes());
app.use(bodyParser());
app.use(jwtMiddleware);

app.use(router.routes()).use(router.allowedMethods());

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
