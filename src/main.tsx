import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import "./index.css";
import "@n8n_io/n8n-demo-component";

// NOTE: The <Toaster> lives inside App.tsx (with its styling config).
// A second Toaster here would render every toast twice.
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
