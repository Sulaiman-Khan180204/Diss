import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo.jsx";
import { fetchNeedGroups } from "../api.js";

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

    useEffect(() => {
        fetchNeedGroups().then(setNeedGroups).catch(() => {});
    }, []);

    return (
        <nav className="w-full bg-green-100 border-b border-green-200/70">
            <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between">

                {/* Left: brand/logo */}
                <Link to="/" className="flex items-center">
                    <Logo />
                </Link>

                {/* Right: navigation */}
                <ul className="flex items-center gap-6 text-green-900 font-medium">

                    {/* Products by Need — hover mega dropdown */}
                    <li
                        className="relative"
                        onMouseEnter={() => setDropdownOpen(true)}
                        onMouseLeave={() => setDropdownOpen(false)}
                    >
                        <button
                            onClick={() => setDropdownOpen((o) => !o)}
                            className="flex items-center gap-1.5 hover:text-green-700 focus:outline-none"
                        >
                            Products by Need
                            <ChevronDown />
                        </button>

                        {dropdownOpen && needGroups.length > 0 && (
                            <div className="absolute right-0 top-full mt-0 w-[600px] max-w-[90vw] bg-white border border-green-100 rounded-xl shadow-xl z-50 p-5">
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
                                            <ul className="space-y-0.5">
                                                {group.conditions?.map((cond) => (
                                                    <li key={cond.slug}>
                                                        <Link
                                                            to={`/conditions/${cond.slug}`}
                                                            className="text-sm text-green-700 hover:text-green-500 hover:underline block"
                                                            onClick={() => setDropdownOpen(false)}
                                                        >
                                                            {cond.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </li>

                    {/* Products */}
                    <li>
                        <Link to="/products" className="hover:text-green-700">Products</Link>
                    </li>

                    {/* Children */}
                    <li>
                        <Link to="/need-groups/children-infants" className="hover:text-green-700">Children</Link>
                    </li>

                    {/* About */}
                    <li>
                        <a href="#" className="hover:text-green-700">About</a>
                    </li>

                </ul>
            </div>
        </nav>
    );
}
