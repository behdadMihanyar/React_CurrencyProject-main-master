import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { GrLinkNext } from "react-icons/gr";
import { GrLinkPrevious } from "react-icons/gr";

const Film = ({
  genre,
  selectedGenre,
  setSelectedGenre,
  allFilms,
  showMore,
  setSelectMovie,
  title,
  setAllFilms,
  page,
  fetching,
  selectMovie,
  setPage,
  showLess,
}) => {
  const [loading, isLoading] = useState(true);
  useEffect(() => {
    const getData = async () => {
      const films = await fetching(page);
      await films.map((item) => item.genre_ids.push(1));
      setAllFilms(films);
      isLoading(false);
      return films;
    };
    getData();
  }, [page, selectMovie]);
  console.log(allFilms);
  return (
    <div>
      {!loading ? (
        <div>
          <div className="flex-nowrap flex text-white justify-center gap-3 mt-8 text-center">
            <button
              value={"popular"}
              className="bg-amber-600 p-2 rounded-2xl w-30 cursor-pointer"
              onClick={() => {
                setSelectMovie("popular");
                setPage(1);
              }}
            >
              Most Popular
            </button>
            <button
              value={"top"}
              className="bg-amber-600 p-2 rounded-2xl w-30 cursor-pointer"
              onClick={() => {
                setSelectMovie("");
                setPage(1);
              }}
            >
              Top rated
            </button>
          </div>
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
          <h1 className="text-white text-center mt-5 font-bold text-2xl">
            {title}
          </h1>

          <div className="grid grid-cols-4 gap-3 text-white max-sm:grid-cols-1 p-5">
            {(selectedGenre.length === 0 ? allFilms : selectedGenre).map(
              (item) => (
                <div
                  key={item.backdrop_path}
                  className="grid grid-cols-2 bg-gray-800 rounded-2xl p-3 hover:bg-cyan-950"
                >
                  <div className="text-center grid grid-cols-1">
                    <div className="grid grid-cols-1">
                      <p className="float-left pt-4 px-4 font-bold text-lg">
                        {item.title}
                      </p>

                      <p className="float-left p-4 text-lg font-bold">
                        {item.release_date?.slice(0, 4)}
                      </p>
                      <p className="float-left pt-4 px-4 font-bold text-md max-sm:text-sm">
                        {item.genre_ids.map((each) => {
                          const getGenre = genre.find(
                            (item) => item.id === each
                          );
                          return getGenre ? `${getGenre.name}-` : null;
                        })}
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
              )
            )}
          </div>
          <div className="flex justify-center gap-4">
            <p
              className="text-center text-white cursor-pointer py-4"
              onClick={showMore}
            >
              <GrLinkNext className="text-amber-300 text-2xl" />
            </p>
            <span className="text-center content-center text-white txt-2xl">
              {page}
            </span>
            {page > 1 && (
              <p
                className="text-center text-white cursor-pointer py-4"
                onClick={showLess}
              >
                <GrLinkPrevious className="text-amber-300 text-2xl" />
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className="flex justify-center mt-35">
          <ClipLoader color="orange" size={100} />
        </div>
      )}
    </div>
  );
};

export default Film;
