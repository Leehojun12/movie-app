import Router from "koa-router";
import * as movieAPI from "./movies.ctrl.js";

const movies = new Router();

movies.get("/:title", movieAPI.getComments);
movies.post("/:title", movieAPI.writeComment);
movies.delete("/:title/:id", movieAPI.checkOwnComment, movieAPI.deleteComment);
movies.patch("/:title/:id", movieAPI.checkOwnComment, movieAPI.updateComment);

export default movies;
