import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AuthContext.jsx";
import Home from "./pages/Home";
import ConditionPage from "./pages/ConditionPage";
import ProductPage from "./pages/ProductPage";
import ProductsListPage from "./pages/ProductsListPage";
import NeedGroupPage from "./pages/NeedGroupPage";
import CompoundsListPage from "./pages/CompoundsListPage";
import CompoundPage from "./pages/CompoundPage";
import BodyMapPage from "./pages/BodyMapPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import OnboardingPage from "./pages/OnboardingPage";
import MySupplementsPage from "./pages/MySupplementsPage";
import FavouritesPage from "./pages/FavouritesPage";
import AboutPage from "./pages/AboutPage";
import "../css/app.css";

const el = document.getElementById("react-content");
if (el) {
    createRoot(el).render(
        <StrictMode>
            <HashRouter>
                <AuthProvider>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/products" element={<ProductsListPage />} />
                        <Route path="/products/:slug" element={<ProductPage />} />
                        <Route path="/conditions/:slug" element={<ConditionPage />} />
                        <Route path="/need-groups/:slug" element={<NeedGroupPage />} />
                        <Route path="/compound-explorer" element={<CompoundsListPage />} />
                        <Route path="/compound-explorer/:slug" element={<CompoundPage />} />
                        <Route path="/body-map" element={<BodyMapPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/my-supplements/onboarding" element={<OnboardingPage />} />
                        <Route path="/my-supplements" element={<MySupplementsPage />} />
                        <Route path="/favourites" element={<FavouritesPage />} />
                        <Route path="/about" element={<AboutPage />} />
                    </Routes>
                </AuthProvider>
            </HashRouter>
        </StrictMode>
    );
}
