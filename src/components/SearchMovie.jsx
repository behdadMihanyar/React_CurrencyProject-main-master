import { GrLinkPrevious } from "react-icons/gr";
import { fetchMovieByName } from "../services/FilmApi";
import { useState } from "react";
const SearchMovie = ({ show, setShow }) => {
  const [name, setName] = useState("");
  const [foundMovies, setFoundMovies] = useState([]);
  console.log(foundMovies.length);
  console.log(foundMovies);
  return (
    <div>
      <div
        className={`fixed w-full h-screen flex justify-center items-center transition-all ease-in-out duration-500 ${
          show
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-90 pointer-events-none"
        }`}
      >
        <div className="w-[720px] rounded-full relative flex flex-col items-center text-white gap-6 direction-ltr p-3">
          <p className="text-2xl"> ? Looking for a movie 🎬</p>
          <div className="w-full relative ">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="search"
              placeholder="... Type here"
              className="p-5 w-full rounded-full text-black text-2xl bg-white shadow-sky-400 shadow-2xl pr-32 pl-6 text-left placeholder:text-lg "
            />
            <a
              className="cursor-pointer absolute right-4 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white px-5 py-2 rounded-full hover:bg-blue-600 transition"
              href={`https://www.themoviedb.org/search?query=${name}`}
            >
              Search
            </a>
          </div>
          <div
            className="flex flex-row mt-15 gap-3 items-center cursor-pointer hover:text-amber-700"
            onClick={() => setShow((prev) => !prev)}
          >
            <p>Go back</p>
            <GrLinkPrevious />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchMovie;
