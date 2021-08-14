import { handleActions } from "redux-actions";
import * as movieAPI from "../lib/api/movie";

// 액션 타입
const GET_MOVIES = "GET_MOVIES";
const GET_MOVIES_SUCCESS = "GET_MOVIES_SUCCESS";
const GET_MOVIES_FAILURE = "GET_MOVIES_FAILURE";

// 액션 생성
export const getMovies = () => async (dispatch) => {
  dispatch({ type: GET_MOVIES });
  try {
    let movies = [];
    const response = await movieAPI.getMovies();
    const data = response.data.boxOfficeResult.dailyBoxOfficeList;
    for (let i = 0; i < data.length; i++) {
      const title = data[i].movieNm;
      const response = await movieAPI.getMovieInfo(title);
      let { userRating, director, actor, image, pubDate } =
        response.data.items[0];

      director = director.replaceAll("|", ", ");
      director = director.slice(0, -2);
      actor = actor.replaceAll("|", ", ");
      actor = actor.slice(0, -2);

      const movieInfo = {
        title,
        rating: userRating,
        director,
        actor,
        image,
        pubDate,
      };
      movies.push(movieInfo);
    }

    dispatch({ type: GET_MOVIES_SUCCESS, payload: movies });
  } catch (e) {
    dispatch({ type: GET_MOVIES_FAILURE, payload: e });
  }
};

// 초기 상태
const initialState = {
  movies: [],
  loading: false,
  error: null,
};

// reducer
const movie = handleActions(
  {
    [GET_MOVIES]: (state, action) => ({
      ...state,
      loading: true,
    }),
    [GET_MOVIES_SUCCESS]: (state, action) => ({
      movies: action.payload,
      loading: false,
    }),
    [GET_MOVIES_FAILURE]: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),
  },
  initialState
);

export default movie;
