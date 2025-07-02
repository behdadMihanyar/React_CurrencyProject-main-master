const SearchMovie = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-[720px] rounded-full relative flex flex-col items-center text-white gap-6 direction-ltr p-3">
        <p className="text-2xl"> ? Looking for a movie 🎬</p>
        <div className="w-full relative">
          <input
            type="search"
            placeholder="Type here ..."
            className="p-5 w-full rounded-full text-black text-2xl bg-white shadow-sky-400 shadow-2xl pr-32 pl-6 text-left"
          />
          <button className="cursor-pointer absolute right-4 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white px-5 py-2 rounded-full hover:bg-blue-600 transition">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchMovie;
