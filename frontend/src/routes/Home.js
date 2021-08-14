import React, { useEffect } from "react";
import Movie from "../Movie.js";
import { useSelector, useDispatch } from "react-redux";
import { getMovies } from "../modules/movie.js";

const Home = () => {
  const dispatch = useDispatch();
  const { movies, loading } = useSelector(({ movie }) => ({
    movies: movie.movies,
    loading: movie.loading,
  }));

  useEffect(() => {
    if (movies.length === 0) {
      dispatch(getMovies());
    }
  }, [dispatch, movies]);

  if (loading) {
    return <div className="loader">Loading...</div>;
  }

  if (!movies) {
    return null;
  }

  return (
    <div className="movie-container">
      {movies.map((movie, idx) => (
        <Movie key={idx} movie={movie} />
      ))}
    </div>
  );
};

export default Home;
