import mongoose from "mongoose";
const { Schema } = mongoose;

const CommentSchema = new Schema({
  text: String,
  createdDate: {
    type: Date,
    default: Date.now,
  },
  user: {
    _id: mongoose.Types.ObjectId,
    username: String,
  },
});

const MovieSchema = new Schema({
  title: String,
  comments: [CommentSchema],
});
// 댓글 저장
const Movie = mongoose.model("Movie", MovieSchema);
export default Movie;
