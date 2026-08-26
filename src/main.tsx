import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/global.scss";
// Imported after Carbon so, on any tie, Tailwind's utilities are considered
// later in source order too — though cascade layers already decide this.
import "./styles/tailwind.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
