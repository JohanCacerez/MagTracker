// main.ts
import "primereact/resources/themes/lara-light-blue/theme.css"; // o el tema que prefieras
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
