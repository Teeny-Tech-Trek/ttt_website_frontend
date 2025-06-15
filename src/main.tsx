import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

const clientId = "1021289055013-jr520ma85ncm14vguhm62i541eq56m5g.apps.googleusercontent.com";

import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <AuthProvider>
        <App />
        <Toaster position="top-right" />
      </AuthProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);
