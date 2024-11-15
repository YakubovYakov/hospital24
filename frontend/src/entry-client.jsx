// entry-client.jsx
import React from "react";
import { hydrateRoot } from "react-dom/client";
import App from "./App";
import { HelmetProvider } from "react-helmet-async";

const rootElement = document.getElementById("app");

hydrateRoot(
  rootElement,
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
