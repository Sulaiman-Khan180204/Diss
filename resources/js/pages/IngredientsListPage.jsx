import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar.jsx";
import { fetchIngredients } from "../api.js";

const EVIDENCE_META = {
    A: { label: "Strong",   color: "bg-green-100 text-green-800 border-green-300" },
    B: { label: "Moderate", color: "bg-amber-100 text-amber-800 border-amber-300" },
    C: { label: "Limited",  color: "bg-gray-100 text-gray-600 border-gray-300" },
};

export default function IngredientsListPage() {
    const [ingredients, setIngredients] = useState([]);
    const [loading, setLoading]         = useState(true);
    const [search, setSearch]           = useState("");
    const [evidenceFilter, setEvidenceFilter] = useState(new Set());

    useEffect(() => {
        fetchIngredients()
            .then(setIngredients)
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    function toggleEvidence(level) {
        setEvidenceFilter((prev) => {
            const next = new Set(prev);
            next.has(level) ? next.delete(level) : next.add(level);
            return next;
        });
    }

    const displayed = useMemo(() => {
        let list = [...ingredients];
        if (search.trim()) {
            const q = search.toLowerCase();
            list = list.filter(
                (i) =>
                    i.name.toLowerCase().includes(q) ||
                    (i.short_benefits ?? "").toLowerCase().includes(q)
            );
        }
        if (evidenceFilter.size > 0) {
            list = list.filter((i) => evidenceFilter.has(i.evidence_level));
        }
        return list;
    }, [ingredients, search, evidenceFilter]);

    return (
        <div className="min-h-screen w-full bg-green-100 flex flex-col">
            <NavBar />

            <main className="flex-1 w-full bg-white rounded-t-3xl mt-6 py-12">
                <div className="max-w-6xl mx-auto px-4">

                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-extrabold text-green-900 mb-1">Ingredient Explorer</h1>
                        <p className="text-gray-500 text-sm">
                            Discover the active compounds and extracts behind every ingredient.
                        </p>
                    </div>

                    {/* Controls */}
                    <div className="flex flex-wrap items-center gap-4 mb-8">
                        <input
                            type="text"
                            placeholder="Search ingredients…"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-72 text-sm border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                        />

                        <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Evidence:</span>
                            {Object.entries(EVIDENCE_META).map(([level, meta]) => (
                                <button
                                    key={level}
                                    onClick={() => toggleEvidence(level)}
                                    className={`text-xs font-semibold px-3 py-1 rounded-full border transition ${
                                        evidenceFilter.has(level)
                                            ? meta.color + " ring-2 ring-offset-1 ring-green-400"
                                            : "bg-white text-gray-500 border-gray-200 hover:border-gray-400"
                                    }`}
                                >
                                    {level} — {meta.label}
                                </button>
                            ))}
                            {evidenceFilter.size > 0 && (
                                <button
                                    onClick={() => setEvidenceFilter(new Set())}
                                    className="text-xs text-green-600 hover:underline"
                                >
                                    Clear
                                </button>
                            )}
                        </div>

                        {!loading && (
                            <span className="ml-auto text-sm text-gray-400">
                                {displayed.length} ingredient{displayed.length !== 1 ? "s" : ""}
                            </span>
                        )}
                    </div>

                    {/* Loading */}
                    {loading && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                            {Array.from({ length: 12 }).map((_, i) => (
                                <div key={i} className="h-28 rounded-xl bg-green-50 animate-pulse" />
                            ))}
                        </div>
                    )}

                    {/* Empty */}
                    {!loading && displayed.length === 0 && (
                        <div className="text-center py-20 text-gray-400">
                            No ingredients match your search.
                        </div>
                    )}

                    {/* Grid */}
                    {!loading && displayed.length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                            {displayed.map((ing) => (
                                <Link
                                    key={ing.slug}
                                    to={`/ingredient-explorer/${ing.slug}`}
                                    className="flex flex-col bg-green-50 hover:bg-green-100 rounded-xl p-4 transition group"
                                >
                                    <div className="flex items-start justify-between gap-2 mb-2">
                                        <p className="font-semibold text-green-900 text-sm leading-snug group-hover:text-green-700">
                                            {ing.name}
                                        </p>
                                        {ing.evidence_level && (
                                            <EvidenceBadge level={ing.evidence_level} />
                                        )}
                                    </div>
                                    {ing.short_benefits && (
                                        <p className="text-xs text-gray-500 leading-snug line-clamp-2">
                                            {ing.short_benefits}
                                        </p>
                                    )}
                                    {ing.compounds_count > 0 && (
                                        <p className="mt-auto pt-2 text-xs text-green-600 font-medium">
                                            {ing.compounds_count} extract{ing.compounds_count !== 1 ? "s" : ""}
                                        </p>
                                    )}
                                </Link>
                            ))}
                        </div>
                    )}

                    {/* Evidence key */}
                    {!loading && (
                        <div className="mt-12 pt-6 border-t border-green-100">
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Evidence Key</p>
                            <div className="flex flex-wrap gap-4">
                                {Object.entries(EVIDENCE_META).map(([level, meta]) => (
                                    <div key={level} className="flex items-center gap-2">
                                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${meta.color}`}>
                                            {level}
                                        </span>
                                        <span className="text-xs text-gray-500">{meta.label} evidence</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

function EvidenceBadge({ level }) {
    const meta = EVIDENCE_META[level];
    if (!meta) return null;
    return (
        <span className={`flex-shrink-0 text-xs font-bold px-2 py-0.5 rounded-full border ${meta.color}`}>
            {level}
        </span>
    );
}
