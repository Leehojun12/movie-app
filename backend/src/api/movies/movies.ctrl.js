import Movie from "../../models/movie.js";

export const getComments = async (ctx) => {
  const { title } = ctx.params;

  const movie = await Movie.findOne({ title }).exec();
  const comments = movie.comments;

  ctx.body = comments;
};

export const writeComment = async (ctx) => {
  const { title } = ctx.params;
  const { comment } = ctx.request.body;
  const exists = await Movie.findOne({ title }).exec();
  comment[0].user = ctx.state.user;

  try {
    let movie;
    if (!exists) {
      movie = new Movie({
        title,
        comments: comment,
      });
      await movie.save();
    } else {
      movie = await Movie.findOneAndUpdate(
        { title },
        { $push: { comments: comment } },
        { new: true }
      ).exec();
    }
    ctx.body = movie;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const deleteComment = async (ctx) => {
  const { title, id } = ctx.params;

  let movie = await Movie.findOne({ title }).exec();
  let comments = movie.comments;
  comments = comments.filter((comment) => comment._id != id);

  movie = await Movie.findOneAndUpdate(
    { title },
    { $set: { comments } },
    { new: true }
  ).exec();

  ctx.body = movie;
};

export const updateComment = async (ctx) => {
  const { title, id } = ctx.params;
  const { comment } = ctx.request.body;
  comment[0].user = ctx.state.user;

  try {
    let movie;
    movie = await Movie.findOne({ title });
    let comments = movie.comments;
    comments.forEach((c) => {
      if (c._id == id) {
        c.text = comment[0].text;
      }
    });
    movie = await Movie.findOneAndUpdate(
      { title },
      { $set: { comments } },
      { new: true }
    ).exec();
    ctx.body = movie;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const checkOwnComment = async (ctx, next) => {
  const { user } = ctx.state;
  const { title, id } = ctx.params;

  let movie = await Movie.findOne({ title }).exec();
  let comments = movie.comments;

  const comment = comments.filter((comment) => comment._id == id);
  if (comment[0].user._id != user._id) {
    return;
  }

  return next();
};
