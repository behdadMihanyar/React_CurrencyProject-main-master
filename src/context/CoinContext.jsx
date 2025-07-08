/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useState, useContext } from "react";

const Behdad = createContext();

const CoinContext = ({ children }) => {
  const [coins, setCoins] = useState([]);
  // const [darkMode, setDarkMode] = useState(false);

  return (
    <Behdad.Provider value={{ coins, setCoins }}>{children}</Behdad.Provider>
  );
};

export const useCoinContext = () => {
  return useContext(Behdad);
};
export default CoinContext;
