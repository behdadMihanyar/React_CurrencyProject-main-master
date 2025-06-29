import { useQuery } from "@tanstack/react-query";
import { ClipLoader } from "react-spinners";
import { useEffect, useState } from "react";
import { fetchGeneres, fetchTrendingMovies } from "../services/FilmApi";
import { toast } from "react-toastify";
import { all } from "axios";
const Films = () => {
  const [allFilms, setAllFilms] = useState([]);
  const [page, setPage] = useState(1);
  const [genre, setGenre] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState([]);

  useEffect(() => {
    const getgenres = async () => {
      let get = await fetchGeneres();
      get.genres.push({ id: 0, name: "all" });
      setGenre(get.genres);
    };
    getgenres();
  }, []);
  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ["film", page],
    queryFn: async ({ queryKey }) => {
      const page = queryKey[1];
      const films = await fetchTrendingMovies(page);
      films.map((item) => item.genre_ids.push(1));
      setAllFilms((prev) => [...prev, ...films]);
      return films;
    },
  });
  const showMore = () => {
    setPage((prev) => prev + 1);
  };

  if (isLoading && page === 1) {
    return (
      <div className="text-center mt-35">
        <ClipLoader color="orange" size={100} />
      </div>
    );
  }
  if (error) {
    return toast.error("Error Loading Movies");
  }
  console.log(selectedGenre);
  return (
    <div>
      <div className="text-white flex flex-wrap gap-3 justify-center mt-6">
        {genre.map((item) => (
          <button
            key={item.id}
            value={item.id}
            onClick={() => {
              setSelectedGenre(
                allFilms.filter((each) =>
                  each.genre_ids.find((para) => para === item.id)
                )
              );
            }}
            className="border-cyan-800 border rounded-2xl p-2 cursor-pointer hover:bg-amber-500 transition"
          >
            {item.name}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-4 gap-3 text-white max-sm:grid-cols-1 p-5">
        {(selectedGenre.length === 0 ? allFilms : selectedGenre).map((item) => (
          <div
            key={item.backdrop_path}
            className="grid grid-cols-2 bg-gray-800 rounded-2xl p-3 hover:bg-cyan-950"
          >
            <div className="text-center grid grid-cols-1">
              <div className="grid grid-cols-1">
                <p className="float-left pt-4 px-4 font-bold text-lg">
                  {item.title}
                </p>
                <p className="float-left pt-4 px-4 font-bold text-lg">
                  {item.genre_ids.map((each) => {
                    const getGenre = genre.find((item) => item.id === each);
                    return getGenre ? `${getGenre.name}-` : null;
                  })}
                </p>

                <p className="float-left p-4 text-lg">
                  {item.release_date?.slice(0, 4)}
                </p>
              </div>
              <div className="grid grid-cols-1">
                <p className="float-left content-center">
                  Rank: {Math.floor(item.vote_average)}
                </p>
                <p className="font-bold text-xl text-amber-600">
                  {item.vote_average >= 8
                    ? "★★★★★"
                    : item.vote_average >= 7
                    ? "★★★★☆"
                    : item.vote_average >= 6
                    ? "★★★☆☆"
                    : item.vote_average >= 5
                    ? "★★☆☆☆"
                    : "★☆☆☆☆"}
                </p>
              </div>
            </div>
            <div>
              <img
                src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
                alt={item.title}
              />
            </div>
          </div>
        ))}
      </div>
      <p
        className="text-center text-white cursor-pointer py-4"
        onClick={showMore}
      >
        {isFetching ? "Loading more..." : "...show more"}
      </p>
    </div>
  );
};

export default Films;
