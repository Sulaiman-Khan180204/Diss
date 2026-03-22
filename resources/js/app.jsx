import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ConditionPage from "./pages/ConditionPage";
import ProductPage from "./pages/ProductPage";
import ProductsListPage from "./pages/ProductsListPage";
import NeedGroupPage from "./pages/NeedGroupPage";
import "../css/app.css";

const el = document.getElementById("react-content");
if (el) {
    createRoot(el).render(
        <StrictMode>
            <HashRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<ProductsListPage />} />
                    <Route path="/products/:slug" element={<ProductPage />} />
                    <Route path="/conditions/:slug" element={<ConditionPage />} />
                    <Route path="/need-groups/:slug" element={<NeedGroupPage />} />
                </Routes>
            </HashRouter>
        </StrictMode>
    );
}
