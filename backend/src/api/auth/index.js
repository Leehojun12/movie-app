import Router from "koa-router";
import * as authAPI from "./auth.ctrl.js";

const auth = new Router();

// get, post, patch, delete
auth.post("/register", authAPI.register);
auth.post("/login", authAPI.login);
auth.get("/check", authAPI.check);
auth.post("/logout", authAPI.logout);

export default auth;
