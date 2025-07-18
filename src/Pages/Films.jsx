import { useContext, useEffect, useState } from "react";
import {
  fetchGeneres,
  fetchTrendingMovies,
  fetchTopMovies,
} from "../services/FilmApi";
import Film from "../components/Film";
import SearchMovie from "../components/SearchMovie";
import { MovieContext } from "../context/FilmContext";
import { toast } from "react-toastify";
const Films = () => {
  // context
  const [allFilms, setAllFilms] = useState([]);
  //states
  const [page, setPage] = useState(1);
  const [genre, setGenre] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState([]);
  const [selectMovie, setSelectMovie] = useState("popular");
  const [searchMovie, setSearchMovie] = useState(false);
  const { show, setShow } = useContext(MovieContext);

  //Get Genres for category
  useEffect(() => {
    toast("use vpn for better experience");
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
      {/* seacrch icon */}
      {!searchMovie && (
        <div
          className="fixed w-15 h-15 bottom-5 left-5"
          onClick={() => setSearchMovie((prev) => !prev)}
        >
          <img src="../img/search.png" />
        </div>
      )}
      {searchMovie ? (
        <SearchMovie show={searchMovie} setShow={setSearchMovie} />
      ) : (
        <SearchMovie show={searchMovie} setShow={setSearchMovie} />
      )}

      {/* Category to show */}
      {selectMovie === "popular" && searchMovie === false && show === false ? (
        <Film
          title="Most Popular"
          genre={genre}
          setGenre={setGenre}
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
          searchMovie={searchMovie}
        />
      ) : searchMovie === false && show === false ? (
        <Film
          title="Top Rated"
          setGenre={setGenre}
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
          searchMovie={searchMovie}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Films;
