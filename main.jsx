import "./index.css";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";

import { AuthProvider } from "./src/context/AuthenticationContext.jsx";
import { SiteProvider } from "./src/context/SiteContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SiteProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </SiteProvider>
  </StrictMode>
);
