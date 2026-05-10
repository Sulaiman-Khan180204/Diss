import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPortal } from "react-dom";
import Logo from "./Logo.jsx";
import { fetchNeedGroups } from "../api.js";
import { useAuth } from "../AuthContext.jsx";
import HelpOverlay from "./HelpOverlay.jsx";

function ChevronDown() {
    return (
        <svg className="w-3 h-3 stroke-current" viewBox="0 0 20 20" fill="none">
            <path d="M5 7l5 6 5-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export default function NavBar() {
    const [needGroups, setNeedGroups] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [helpOpen, setHelpOpen] = useState(false);
    const { user, logout, loading } = useAuth();
    const location = useLocation();
    const isHome = location.pathname === "/";

    useEffect(() => {
        fetchNeedGroups().then(setNeedGroups).catch(() => {});
    }, []);

    return (
        <>
        <nav className="w-full bg-green-100 border-b-2 border-green-400">
            <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between">

                {/* Left: brand/logo */}
                <Link to="/" className="flex items-center">
                    <Logo />
                </Link>

                {/* Right: navigation */}
                <ul className={`flex items-center text-sm text-green-900 font-medium ${user ? "gap-5" : "gap-6"}`}>

                    {/* Home */}
                    <li data-help-id="nav-home">
                        <Link to="/" className="hover:text-green-700">Home</Link>
                    </li>

                    {/* Products by Need — hover mega dropdown */}
                    <li
                        className="relative"
                        data-help-id="nav-products-by-need"
                        onMouseEnter={() => setDropdownOpen(true)}
                        onMouseLeave={() => setDropdownOpen(false)}
                    >
                        <button
                            onClick={() => setDropdownOpen((o) => !o)}
                            className="flex items-center gap-1.5 hover:text-green-700 focus:outline-none"
                        >
                            By Need
                            <ChevronDown />
                        </button>

                        {dropdownOpen && needGroups.length > 0 && (
                            <div className="absolute left-0 top-full mt-0 w-[600px] bg-white border border-green-100 rounded-xl shadow-xl z-50 p-5">
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                    {needGroups.map((group) => (
                                        <div key={group.slug}>
                                            <Link
                                                to={`/need-groups/${group.slug}`}
                                                className="font-semibold text-green-900 text-xs uppercase tracking-wide mb-1 hover:text-green-600 block"
                                                onClick={() => setDropdownOpen(false)}
                                            >
                                                {group.name}
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </li>

                    {/* Body Map */}
                    <li data-help-id="nav-body-map">
                        <Link to="/body-map" className="hover:text-green-700">Body Map</Link>
                    </li>

                    {/* Compound Explorer */}
                    <li data-help-id="nav-compound-explorer">
                        <Link to="/compound-explorer" className="hover:text-green-700">Compounds</Link>
                    </li>

                    {/* Products */}
                    <li data-help-id="nav-products">
                        <Link to="/products" className="hover:text-green-700">Products</Link>
                    </li>

                    {/* Children */}
                    <li data-help-id="nav-children">
                        <Link to="/need-groups/children-infants" className="hover:text-green-700">Children</Link>
                    </li>

                    {/* About */}
                    <li>
                        <Link to="/about" className="hover:text-green-700">About</Link>
                    </li>

                    {/* Auth */}
                    {!loading && (
                        user ? (
                            <>
                                <li data-help-id="nav-auth">
                                    <Link to="/my-supplements" className="text-green-700 font-semibold hover:text-green-900">
                                        My Plan
                                    </Link>
                                </li>
                                <li data-help-id="nav-favourites">
                                    <Link to="/favourites" title="My Favourites" className="hover:opacity-80 transition-opacity">
                                        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-yellow-400 stroke-yellow-500" strokeWidth="1.8">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                        </svg>
                                    </Link>
                                </li>
                                <li>
                                    <button
                                        onClick={logout}
                                        className="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-1.5 rounded-full transition"
                                    >
                                        Log out
                                    </button>
                                </li>
                            </>
                        ) : (
                            <li data-help-id="nav-auth">
                                <Link
                                    to="/login"
                                    className="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-1.5 rounded-full transition"
                                >
                                    Log in
                                </Link>
                            </li>
                        )
                    )}

                    {/* Help button — homepage only */}
                    {isHome && (
                        <li>
                            <button
                                onClick={() => setHelpOpen(true)}
                                title="How to use this site"
                                className="w-7 h-7 rounded-full border-2 border-green-700 text-green-700 hover:bg-green-700 hover:text-white transition flex items-center justify-center font-bold text-sm leading-none"
                            >
                                ?
                            </button>
                        </li>
                    )}

                </ul>
            </div>
        </nav>

        {helpOpen && createPortal(
            <HelpOverlay onClose={() => setHelpOpen(false)} user={user} />,
            document.body
        )}
        </>
    );
}
