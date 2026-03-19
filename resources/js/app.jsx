
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Home from "./pages/Home";
import "../css/app.css"; // Tailwind is already imported here

const el = document.getElementById("react-content");
if (el) {
  createRoot(el).render(
    <StrictMode>
      <Home />
    </StrictMode>
  );
}
