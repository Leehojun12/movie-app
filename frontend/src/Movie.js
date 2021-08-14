import React from "react";
import { Link } from "react-router-dom";
import "./Movie.css";

function Movie(movie) {
  const { title, rating, pubDate, director, actor, image } = movie.movie;

  return (
    <div className="movie-wrapper">
      <img src={image} alt={title} title={title}></img>
      <div className="movie_data">
        <h2 className="movie_title">
          <Link to={`/movie/${title}`}>{title}</Link>
        </h2>
        <div className="rating">{rating}</div>
        <div className="movie_pubDate">{pubDate}</div>
        <div className="director">{director}</div>
        <div className="actor">{actor}</div>
      </div>
    </div>
  );
}

export default Movie;
