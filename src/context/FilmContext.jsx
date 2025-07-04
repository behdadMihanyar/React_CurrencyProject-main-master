import { createContext, useState } from "react";
export const MovieContext = createContext();
const FilmContext = ({ children }) => {
  const [show, setShow] = useState(false);
  return (
    <MovieContext.Provider value={{ show, setShow }}>
      {children}
    </MovieContext.Provider>
  );
};

export default FilmContext;
