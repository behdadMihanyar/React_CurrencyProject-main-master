import { useQuery } from "@tanstack/react-query";
import { ClipLoader } from "react-spinners";
import { useEffect, useState } from "react";
import {
  fetchGeneres,
  fetchTrendingMovies,
  fetchTopMovies,
} from "../services/FilmApi";
import { toast } from "react-toastify";
import { all } from "axios";
import Film from "../components/Film";
const Films = () => {
  const [allFilms, setAllFilms] = useState([]);
  const [page, setPage] = useState(1);
  const [genre, setGenre] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState([]);
  const [selectMovie, setSelectMovie] = useState("popular");

  useEffect(() => {
    const getgenres = async () => {
      let get = await fetchGeneres();
      get.genres.push({ id: 0, name: "all" });
      setGenre(get.genres);
    };
    getgenres();
  }, []);
  const showMore = () => {
    setPage((prev) => prev + 1);
  };
  const showLess = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
    return;
  };
  return (
    <div>
      {selectMovie === "popular" ? (
        <Film
          title="Most Popular"
          genre={genre}
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
          allFilms={allFilms}
          showMore={showMore}
          setAllFilms={setAllFilms}
          page={page}
          fetching={fetchTrendingMovies}
          setSelectMovie={setSelectMovie}
          selectMovie={selectMovie}
          showLess={showLess}
        />
      ) : (
        <Film
          title="Top Rated"
          genre={genre}
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
          allFilms={allFilms}
          showMore={showMore}
          setAllFilms={setAllFilms}
          page={page}
          fetching={fetchTopMovies}
          setSelectMovie={setSelectMovie}
          selectMovie={selectMovie}
          showLess={showLess}
        />
      )}
    </div>
  );
};

export default Films;
