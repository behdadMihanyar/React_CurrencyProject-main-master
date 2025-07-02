import { useEffect, useState } from "react";
import {
  fetchGeneres,
  fetchTrendingMovies,
  fetchTopMovies,
} from "../services/FilmApi";
import Film from "../components/Film";
import SearchMovie from "../components/SearchMovie";
const Films = () => {
  const [allFilms, setAllFilms] = useState([]);
  const [page, setPage] = useState(1);
  const [genre, setGenre] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState([]);
  const [selectMovie, setSelectMovie] = useState("popular");
  const [searchMovie, setSearchMovie] = useState(false);

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
      <div
        className="fixed w-15 h-15 bottom-5 left-5"
        onClick={() => setSearchMovie((prev) => !prev)}
      >
        <img src="../img/search.png" />
      </div>
      {searchMovie && <SearchMovie />}
      {selectMovie === "popular" && searchMovie === false ? (
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
          setPage={setPage}
        />
      ) : searchMovie === false ? (
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
          setPage={setPage}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Films;
