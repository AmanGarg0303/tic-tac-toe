import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { GameProvider } from "./providers/gameProvider";
import { Toaster } from "react-hot-toast";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <GameProvider>
    <App />
    <Toaster position="top-right" reverseOrder={false} />
  </GameProvider>
  // </React.StrictMode>
);

reportWebVitals();
