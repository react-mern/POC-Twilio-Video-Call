import React from "react";
import ReactDOM from "react-dom/client";
import App from "@src/App.tsx";
import GlobalStyle from "@src/styled/Global.style.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>
);
