import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar.jsx";
import { fetchCompounds } from "../api.js";

const CATEGORY_ORDER = [
    "Vitamins",
    "Minerals",
    "Botanicals & Herbals",
    "Fatty Acids & Lipids",
    "Sports & Performance",
    "Gut & Digestive Health",
    "Joint & Connective Tissue",
];

export default function CompoundsListPage() {
    const [compounds, setCompounds] = useState([]);
    const [loading, setLoading]     = useState(true);
    const [search, setSearch]       = useState("");

    useEffect(() => {
        fetchCompounds()
            .then(setCompounds)
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    const grouped = useMemo(() => {
        const q = search.trim().toLowerCase();
        const filtered = q
            ? compounds.filter(
                (c) =>
                    c.name.toLowerCase().includes(q) ||
                    (c.description ?? "").toLowerCase().includes(q) ||
                    (c.products ?? []).some((p) => p.name.toLowerCase().includes(q))
              )
            : compounds;

        const map = {};
        CATEGORY_ORDER.forEach((cat) => (map[cat] = []));
        filtered.forEach((c) => {
            const cat = c.category ?? "Other";
            if (!map[cat]) map[cat] = [];
            map[cat].push(c);
        });
        return map;
    }, [compounds, search]);

    const totalVisible = useMemo(
        () => Object.values(grouped).reduce((sum, arr) => sum + arr.length, 0),
        [grouped]
    );

    const slugList = useMemo(
        () => CATEGORY_ORDER.flatMap((cat) => (grouped[cat] ?? []).map((c) => c.slug)),
        [grouped]
    );

    return (
        <div className="min-h-screen w-full bg-green-100 flex flex-col">
            <NavBar />

            <main className="flex-1 w-full bg-white rounded-t-3xl mt-6 py-12">
                <div className="max-w-6xl mx-auto px-4">

                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-extrabold text-green-900 mb-1">Compound Explorer</h1>
                        <p className="text-gray-500 text-sm">
                            Browse the active extracts behind our products and understand how each one works.
                        </p>
                    </div>

                    {/* Search */}
                    <div className="flex items-center gap-4 mb-10">
                        <input
                            type="text"
                            placeholder="Search compounds or products…"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-80 text-sm border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                        {!loading && (
                            <span className="text-sm text-gray-400">
                                {totalVisible} compound{totalVisible !== 1 ? "s" : ""}
                            </span>
                        )}
                    </div>

                    {/* Loading */}
                    {loading && (
                        <div className="space-y-10">
                            {[1, 2, 3].map((i) => (
                                <div key={i}>
                                    <div className="h-5 w-40 bg-green-50 rounded animate-pulse mb-4" />
                                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {[1, 2, 3].map((j) => (
                                            <div key={j} className="h-28 bg-green-50 rounded-xl animate-pulse" />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Empty */}
                    {!loading && totalVisible === 0 && (
                        <div className="text-center py-20 text-gray-400">
                            No compounds match your search.
                        </div>
                    )}

                    {/* Grouped list */}
                    {!loading && totalVisible > 0 && (
                        <div className="space-y-12">
                            {CATEGORY_ORDER.map((cat) => {
                                const items = grouped[cat];
                                if (!items || items.length === 0) return null;
                                return (
                                    <section key={cat}>
                                        <h2 className="text-base font-bold text-green-900 uppercase tracking-wide mb-4 border-b border-green-100 pb-2">
                                            {cat}
                                        </h2>
                                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {items.map((compound) => (
                                                <Link
                                                    key={compound.id}
                                                    to={`/compound-explorer/${compound.slug}`}
                                                    state={{ slugList }}
                                                    className="flex flex-col bg-green-50 hover:bg-green-100 border border-green-100 rounded-xl p-4 transition group"
                                                >
                                                    <p className="font-semibold text-green-900 text-sm leading-snug group-hover:text-green-700 mb-1">
                                                        {compound.name}
                                                    </p>
                                                    {compound.description && (
                                                        <p className="text-xs text-gray-500 leading-snug line-clamp-2 mb-3">
                                                            {compound.description}
                                                        </p>
                                                    )}
                                                    {compound.products?.length > 0 && (
                                                        <div className="mt-auto flex flex-wrap gap-1.5">
                                                            {compound.products.map((p) => (
                                                                <span
                                                                    key={p.slug}
                                                                    className="text-xs bg-white border border-green-200 text-green-700 px-2 py-0.5 rounded-full"
                                                                >
                                                                    {p.name}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    )}
                                                </Link>
                                            ))}
                                        </div>
                                    </section>
                                );
                            })}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
