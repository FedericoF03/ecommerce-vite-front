import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { AuthProvider } from "./src/context/AuthenticationContext.jsx";
import App from "./App.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <App/>
    </AuthProvider>
  </StrictMode>
);
