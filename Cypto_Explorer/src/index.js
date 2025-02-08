import React from "react";
import ReactDOM from "react-dom/client"; // Use React 18 syntax
import "./index.css";
import App from "./App";
import "react-alice-carousel/lib/alice-carousel.css";
import { CryptoProvider } from "./CryptoContext"; // Fixed CryptoContext issue

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <CryptoProvider> 
      <App />
    </CryptoProvider>
  </React.StrictMode>
);
