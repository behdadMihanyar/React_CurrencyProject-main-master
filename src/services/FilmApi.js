import axios from "axios";

export const tmdbRequestOptions = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZjhkOWQ5MTE5MDRiYmI2OTA5MmRkNDM1MTA1Njc2MyIsIm5iZiI6MTc1MTAyOTQ0OC43NCwic3ViIjoiNjg1ZTk2YzgxMGZlYTM5Yjg2N2I0MzRhIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.OosnoyB1nmh2eQ87m4KKyCv0KzL_ZpZAb7SQ5FPHdtQ",
  },
};

//Tranding
export const fetchTrendingMovies = async (page = 1) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=${page}`,
    tmdbRequestOptions
  );

  return response.data.results;
};

//Genres
export const fetchGeneres = async () => {
  const req = await fetch(
    "https://api.themoviedb.org/3/genre/movie/list?language=en",
    tmdbRequestOptions
  );
  const res = await req.json();
  return res;
};

//Top
export const fetchTopMovies = async (page = 1) => {
  console.log("fetching Top Movies");
  const req = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}`,
    tmdbRequestOptions
  );
  console.log("top rated starts");
  const res = await req.json();
  return res.results;
};

//Search by name
export const fetchMovieByName = async (movieName) => {
  const req = fetch(
    `https://api.themoviedb.org/3/search/movie?query=${movieName}&include_adult=false&language=en-US&page=1`,
    tmdbRequestOptions
  );
  const res = req.json();
  console.log(res);
};
