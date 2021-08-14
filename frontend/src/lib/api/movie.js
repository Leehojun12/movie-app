import axios from 'axios';


export const getMovies = async () => {
    const getFormatDate = (date) => {
        const year = date.getFullYear().toString();
        let month = (date.getMonth() + 1).toString();
        let nDate = (date.getDate() - 1).toString();
        if (month < 10) {
          month = '0' + month;
        }
        if (nDate < 10) {
          nDate = '0' + nDate;      
        }
        return year + month + nDate;
      };
      const KEY_ID = '2e46568045dda0e8785b8bf3e3b5f18b';
      const targetDt = getFormatDate(new Date());

    return  await axios.get(
        `http://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${KEY_ID}&targetDt=${targetDt}`,
      );
}

export const getMovieInfo = async (movie) => {
    const ID_KEY = 'wAnWY1Io25fSGFCYfbGK';
    const SECRET_KEY = 'meK_dyoyDq';

    return await axios.get('/v1/search/movie.json', {
        params: { query: movie, display: 1 },
        headers: {
          'X-Naver-Client-Id': ID_KEY,
          'X-Naver-Client-Secret': SECRET_KEY,
        },
      });
}