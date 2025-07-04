import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import CoinContext from "./context/CoinContext.jsx";
import FilmContext from "./context/FilmContext.jsx";
createRoot(document.getElementById("root")).render(
  <>
    <FilmContext>
      <CoinContext>
        <App />
      </CoinContext>
    </FilmContext>
  </>
);
