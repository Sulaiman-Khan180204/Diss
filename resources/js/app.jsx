import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ConditionPage from "./pages/ConditionPage";
import ProductPage from "./pages/ProductPage";
import "../css/app.css";

const el = document.getElementById("react-content");
if (el) {
    createRoot(el).render(
        <StrictMode>
            <HashRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/conditions/:slug" element={<ConditionPage />} />
                    <Route path="/products/:slug" element={<ProductPage />} />
                </Routes>
            </HashRouter>
        </StrictMode>
    );
}
