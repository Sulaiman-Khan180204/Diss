import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar.jsx";
import CategoryCard from "../components/CategoryCard.jsx";
import ProductCard from "../components/ProductCard.jsx";
import { fetchNeedGroups, fetchSearch } from "../api.js";

function useDebounce(value, delay) {
    const [debounced, setDebounced] = useState(value);
    useEffect(() => {
        const t = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(t);
    }, [value, delay]);
    return debounced;
}

export default function Home() {
    const [query, setQuery] = useState("");
    const [needGroups, setNeedGroups] = useState([]);
    const [searchResults, setSearchResults] = useState(null);
    const [searching, setSearching] = useState(false);
    const debouncedQuery = useDebounce(query, 300);
    const searchRef = useRef(null);

    // Fetch need groups for the categories section
    useEffect(() => {
        fetchNeedGroups().then(setNeedGroups).catch(() => {});
    }, []);

    // Live search
    useEffect(() => {
        if (!debouncedQuery.trim()) {
            setSearchResults(null);
            return;
        }
        setSearching(true);
        fetchSearch(debouncedQuery)
            .then(setSearchResults)
            .catch(() => setSearchResults(null))
            .finally(() => setSearching(false));
    }, [debouncedQuery]);

    // Close search results on outside click
    useEffect(() => {
        function handleClick(e) {
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                setSearchResults(null);
                setQuery("");
            }
        }
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    const hasResults =
        searchResults &&
        (searchResults.products?.length || searchResults.conditions?.length || searchResults.ingredients?.length);

    return (
        <div className="min-h-screen w-full bg-green-100 flex flex-col items-center">
            <NavBar />

            {/* HERO */}
            <section className="w-full bg-green-100 py-6">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="mt-10 text-center">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-green-900 leading-tight">
                            Find the Right Supplement<br className="hidden sm:block" />for Your Wellbeing
                        </h1>

                        <p className="text-green-700 mt-4 text-base sm:text-lg">
                            Describe how you're feeling today…
                        </p>

                        {/* Search bar */}
                        <div ref={searchRef} className="mt-6 mx-auto max-w-xl relative">
                            <form
                                onSubmit={(e) => e.preventDefault()}
                                className="flex items-center bg-white shadow-md rounded-full px-4 py-3"
                                aria-label="Wellbeing search form"
                            >
                                <label htmlFor="search" className="sr-only">
                                    Describe how you're feeling
                                </label>
                                <input
                                    id="search"
                                    type="text"
                                    placeholder="e.g. trouble sleeping, low energy, immune support…"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    className="flex-1 outline-none text-green-900 placeholder:text-green-400 placeholder:text-sm"
                                    autoComplete="off"
                                />
                                {searching ? (
                                    <span className="ml-3 w-9 h-9 flex items-center justify-center">
                                        <svg className="animate-spin h-5 w-5 text-green-600" viewBox="0 0 24 24" fill="none">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                        </svg>
                                    </span>
                                ) : (
                                    <button
                                        type="submit"
                                        className="ml-3 inline-flex items-center justify-center w-9 h-9 rounded-full bg-green-600 hover:bg-green-700 text-white transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600"
                                        aria-label="Search"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z" />
                                        </svg>
                                    </button>
                                )}
                            </form>

                            {/* Inline search results dropdown */}
                            {query.trim() && (
                                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-green-100 z-40 max-h-[70vh] overflow-y-auto text-left">
                                    {!hasResults && !searching && (
                                        <p className="p-4 text-sm text-gray-500">No results for "{query}"</p>
                                    )}

                                    {searchResults?.conditions?.length > 0 && (
                                        <div className="p-4 border-b border-green-50">
                                            <p className="text-xs font-semibold text-green-600 uppercase tracking-wide mb-2">Health Needs</p>
                                            <ul className="space-y-1">
                                                {searchResults.conditions.map((c) => (
                                                    <li key={c.slug}>
                                                        <Link
                                                            to={`/conditions/${c.slug}`}
                                                            className="block text-sm text-green-800 hover:text-green-600 py-1"
                                                            onClick={() => { setQuery(""); setSearchResults(null); }}
                                                        >
                                                            {c.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {searchResults?.ingredients?.length > 0 && (
                                        <div className="p-4 border-b border-green-50">
                                            <p className="text-xs font-semibold text-green-600 uppercase tracking-wide mb-2">Ingredients</p>
                                            <ul className="space-y-1">
                                                {searchResults.ingredients.map((i) => (
                                                    <li key={i.id} className="text-sm text-gray-700 py-1">{i.name}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {searchResults?.products?.length > 0 && (
                                        <div className="p-4">
                                            <p className="text-xs font-semibold text-green-600 uppercase tracking-wide mb-2">Products</p>
                                            <ul className="space-y-1">
                                                {searchResults.products.map((p) => (
                                                    <li key={p.slug}>
                                                        <Link
                                                            to={`/products/${p.slug}`}
                                                            className="flex items-center gap-3 py-1.5 hover:bg-green-50 rounded-lg px-2 -mx-2"
                                                            onClick={() => { setQuery(""); setSearchResults(null); }}
                                                        >
                                                            {p.image_url && (
                                                                <img src={p.image_url} alt={p.name} className="w-10 h-10 object-contain rounded bg-green-50 flex-shrink-0" />
                                                            )}
                                                            <div>
                                                                <p className="text-sm font-medium text-green-900">{p.name}</p>
                                                                {p.form && <p className="text-xs text-green-600 capitalize">{p.form}</p>}
                                                            </div>
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* CATEGORIES */}
            <section className="w-full bg-white py-12 rounded-t-3xl mt-6">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-2xl font-semibold text-green-900 text-center mb-10">
                        Find what's right for you
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 place-items-stretch">
                        {needGroups.length > 0
                            ? needGroups.map((group) => (
                                <CategoryCard
                                    key={group.slug}
                                    title={group.name}
                                    items={group.conditions ?? []}
                                />
                            ))
                            : /* skeleton placeholders while loading */
                            Array.from({ length: 4 }).map((_, i) => (
                                <div key={i} className="bg-green-50 rounded-xl h-40 animate-pulse" />
                            ))
                        }
                    </div>

                    <p className="mt-10 text-xs text-green-700 text-center max-w-3xl mx-auto">
                        This is general wellbeing information and not medical advice. If symptoms persist or you're taking
                        medication, please consult a healthcare professional.
                    </p>
                </div>
            </section>
        </div>
    );
}
