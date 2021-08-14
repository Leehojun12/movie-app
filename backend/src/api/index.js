import Router from "koa-router";
import auth from "./auth/index.js";
import movies from "./movies/index.js";
const api = new Router();

api.use("/auth", auth.routes());
api.use("/movies", movies.routes());

export default api;
