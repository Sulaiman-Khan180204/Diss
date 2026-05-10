import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar.jsx";
import CategoryCard from "../components/CategoryCard.jsx";
import { fetchNeedGroups } from "../api.js";
import useSemanticSearch from "../useSemanticSearch.js";

/** Small AI status badge inside the search bar */
function AiBadge({ status }) {
    const colors = {
        loading:     "bg-gray-100 text-gray-400",
        model_ready: "bg-yellow-50 text-yellow-600",
        indexing:    "bg-blue-50 text-blue-500",
        ready:       "bg-green-100 text-green-700",
        error:       "bg-red-50 text-red-400",
    };
    const labels = {
        loading:     "AI loading…",
        model_ready: "AI loading…",
        indexing:    "AI indexing…",
        ready:       "AI",
        error:       "AI off",
    };
    return (
        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${colors[status] ?? colors.loading}`}>
            {labels[status] ?? "AI"}
        </span>
    );
}

/** Generate a friendly intro sentence from the user's query */
function buildIntro(query) {
    const q = query.trim().toLowerCase();
    // Strip leading filler phrases for a cleaner summary
    const cleaned = query.replace(/^(i |my |i'm |i am |i've been |i feel |i keep |im )/i, "");
    return `Based on what you've described — "${cleaned}" — here are the supplements we think could help, and why:`;
}

function matchDots(score) {
    const pct = score * 100;
    if (pct < 10) return 1;
    if (pct < 30) return 2;
    return 3;
}

function MatchDots({ score }) {
    const dots = matchDots(score);
    const labels = { 1: "Relevant", 2: "Good match", 3: "Strong match" };
    return (
        <span className="flex items-center gap-1 flex-shrink-0" title={labels[dots]}>
            {[1, 2, 3].map((i) => (
                <span
                    key={i}
                    className={`w-2.5 h-2.5 rounded-full ${i <= dots ? "bg-green-500" : "bg-green-100"}`}
                />
            ))}
            <span className="text-xs text-gray-400 ml-1">{labels[dots]}</span>
        </span>
    );
}

/** Product card shown in the AI answer panel */
function RecommendedProduct({ product, rank }) {
    const snippet = product.description
        ? product.description.slice(0, 180).trimEnd() + (product.description.length > 180 ? "…" : "")
        : null;

    return (
        <div className="flex gap-4 p-5 bg-white border border-green-100 rounded-2xl shadow-sm hover:shadow-md transition">
            {/* Rank number */}
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-600 text-white text-sm font-bold flex items-center justify-center mt-0.5">
                {rank}
            </div>

            {/* Product image */}
            {product.image_url && (
                <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-16 h-16 object-contain rounded-xl bg-green-50 flex-shrink-0"
                />
            )}

            {/* Details */}
            <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                    <Link
                        to={`/products/${product.slug}`}
                        className="font-semibold text-green-900 hover:text-green-700 leading-snug"
                    >
                        {product.name}
                    </Link>
                    <MatchDots score={product.score} />
                </div>

                {product.form && (
                    <p className="text-xs text-gray-400 capitalize mt-0.5">{product.form}</p>
                )}

                {snippet && (
                    <p className="text-sm text-gray-600 mt-2 leading-relaxed">{snippet}</p>
                )}

                <Link
                    to={`/products/${product.slug}`}
                    className="inline-block mt-3 text-xs font-medium text-green-700 hover:text-green-900 underline underline-offset-2"
                >
                    View full details →
                </Link>
            </div>
        </div>
    );
}

export default function Home() {
    const [query, setQuery]           = useState("");
    const [submitted, setSubmitted]   = useState(""); // the query that was actually submitted
    const [needGroups, setNeedGroups] = useState([]);
    const inputRef                    = useRef(null);

    const { status, error, results, searching, search } = useSemanticSearch();

    useEffect(() => {
        fetchNeedGroups().then(setNeedGroups).catch(() => {});
    }, []);

    function handleChange(e) {
        const val = e.target.value;
        setQuery(val);
        setSubmitted(val.trim());
        if (status === "ready") search(val);
    }

    // Keep Enter working as before
    function handleKeyDown(e) {
        if (e.key === "Enter" && query.trim() && status === "ready") {
            e.preventDefault();
            setSubmitted(query.trim());
            search(query.trim());
        }
    }

    function handleClear() {
        setSubmitted("");
        setQuery("");
        inputRef.current?.focus();
    }

    const hasProducts  = results?.products?.length > 0;
    const showAnswer   = submitted && !searching && results;
    const showNoResult = submitted && !searching && results && !hasProducts;

    return (
        <div className="min-h-screen w-full bg-green-100 flex flex-col items-center">
            <NavBar />

            {/* HERO */}
            <section className="w-full bg-green-100 py-6">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="-mt-2 text-center">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-green-900 leading-tight">
                            Find the Right Supplement<br className="hidden sm:block" />for Your Wellbeing
                        </h1>

                        <p className="text-green-700 mt-4 text-base sm:text-lg">
                            Describe how you're feeling with a short query — press Enter for AI recommendations
                        </p>

                        {/* Search bar */}
                        <div className="mt-6 mx-auto max-w-xl" data-help-id="ai-search">
                            <div className="flex items-center bg-white shadow-md rounded-full px-5 py-3 gap-3">
                                {/* Magnifier icon */}
                                <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z" />
                                </svg>

                                <input
                                    ref={inputRef}
                                    type="text"
                                    placeholder="e.g. I keep getting ill in winter…"
                                    value={query}
                                    onChange={handleChange}
                                    onKeyDown={handleKeyDown}
                                    className="flex-1 outline-none text-green-900 placeholder:text-green-400 placeholder:text-sm bg-transparent"
                                    autoComplete="off"
                                />

                                {/* Spinner while searching */}
                                {searching && (
                                    <svg className="animate-spin h-4 w-4 text-green-600 flex-shrink-0" viewBox="0 0 24 24" fill="none">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                    </svg>
                                )}

                                <AiBadge status={status} />
                            </div>

                            {/* Status hint */}
                            <p className="mt-2 text-xs text-center">
                                {status === "error"
                                    ? <span className="text-red-400">AI error: {error || "unknown"}</span>
                                    : status === "ready"
                                    ? <span className="text-green-600">Type your concern and scroll down to see results</span>
                                    : <span className="text-gray-400">{status === "indexing" ? "AI is indexing the catalogue…" : "AI model loading (first visit only)…"}</span>
                                }
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* AI ANSWER PANEL */}
            {(showAnswer || showNoResult || searching) && (
                <section className="w-full bg-white rounded-t-3xl mt-6 py-10">
                    <div className="max-w-2xl mx-auto px-4">

                        {/* Searching spinner */}
                        {searching && (
                            <div className="flex items-center gap-3 text-green-700">
                                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                </svg>
                                <span className="text-sm">AI is finding your recommendations…</span>
                            </div>
                        )}

                        {/* Answer */}
                        {showAnswer && (
                            <>
                                {/* AI intro */}
                                <div className="flex items-start gap-3 mb-6">
                                    <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.347.35A3.001 3.001 0 0112 21a3 3 0 01-2.121-.879l-.347-.35z" />
                                        </svg>
                                    </div>
                                    <p className="text-sm text-gray-700 leading-relaxed pt-1">
                                        {buildIntro(submitted)}
                                    </p>
                                </div>

                                {/* No products */}
                                {showNoResult && (
                                    <p className="text-sm text-gray-500 ml-11">
                                        No close matches found. Try rephrasing — for example, "low energy", "immune support", or "joint pain".
                                    </p>
                                )}

                                {/* Product cards */}
                                {hasProducts && (
                                    <div className="space-y-4 ml-0">
                                        {results.products.map((p, i) => (
                                            <RecommendedProduct key={p.slug} product={p} rank={i + 1} />
                                        ))}
                                    </div>
                                )}

                                {/* Disclaimer + clear button */}
                                <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                    <p className="text-xs text-gray-400 max-w-md">
                                        This is general wellbeing information, not medical advice. Consult a healthcare professional if symptoms persist.
                                    </p>
                                    <button
                                        onClick={handleClear}
                                        className="text-sm text-green-700 hover:text-green-900 font-medium underline underline-offset-2 flex-shrink-0"
                                    >
                                        ← Search again
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </section>
            )}

        </div>
    );
}
