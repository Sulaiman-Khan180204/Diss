import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar.jsx";
import { fetchProducts } from "../api.js";
import { useAuth } from "../AuthContext.jsx";
import useFavourites from "../useFavourites.js";

const SUITABILITY_OPTIONS = [
    {
        key: "vegan",
        label: "Vegan Friendly",
        test: (p) => !["softgel", "gummy"].includes(p.form),
    },
    {
        key: "no-pills",
        label: "No Tablets / Capsules",
        test: (p) => ["powder", "drops", "oil", "syrup", "resin", "liquid"].includes(p.form),
    },
];

export default function ProductsListPage() {
    const [products, setProducts]   = useState([]);
    const [loading, setLoading]     = useState(true);

    const { user } = useAuth();
    const { favourites, toggle } = useFavourites();

    const [sort, setSort]                           = useState("az");
    const [nameSearch, setNameSearch]               = useState("");
    const [selectedGroups, setSelectedGroups]       = useState(new Set());
    const [selectedForms, setSelectedForms]         = useState(new Set());
    const [selectedSuitability, setSelectedSuitability] = useState(new Set());

    useEffect(() => {
        fetchProducts()
            .then(setProducts)
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    /* ── Derive unique need groups from product conditions ── */
    const allNeedGroups = useMemo(() => {
        const map = new Map();
        products.forEach((p) => {
            p.conditions?.forEach((c) => {
                if (c.need_group && !map.has(c.need_group.slug)) {
                    map.set(c.need_group.slug, c.need_group);
                }
            });
        });
        return Array.from(map.values()).sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
    }, [products]);

    /* ── Derive unique form types from all products ── */
    const allForms = useMemo(() => {
        const forms = new Set();
        products.forEach((p) => { if (p.form) forms.add(p.form); });
        return Array.from(forms).sort();
    }, [products]);

    /* ── Apply filters + sort ── */
    const displayProducts = useMemo(() => {
        let list = [...products];

        if (selectedGroups.size > 0) {
            list = list.filter((p) =>
                p.conditions?.some((c) => selectedGroups.has(c.need_group?.slug))
            );
        }

        if (selectedForms.size > 0) {
            list = list.filter((p) => selectedForms.has(p.form));
        }

        if (selectedSuitability.size > 0) {
            const activeTests = SUITABILITY_OPTIONS
                .filter((o) => selectedSuitability.has(o.key))
                .map((o) => o.test);
            list = list.filter((p) => activeTests.every((test) => test(p)));
        }

        if (nameSearch.trim()) {
            const q = nameSearch.toLowerCase();
            list = list.filter((p) => p.name.toLowerCase().includes(q));
        }

        if (sort === "az") list.sort((a, b) => a.name.localeCompare(b.name));
        if (sort === "za") list.sort((a, b) => b.name.localeCompare(a.name));

        return list;
    }, [products, sort, nameSearch, selectedGroups, selectedForms, selectedSuitability]);

    function toggleSet(setter, key) {
        setter((prev) => {
            const next = new Set(prev);
            next.has(key) ? next.delete(key) : next.add(key);
            return next;
        });
    }

    const hasActiveFilters =
        selectedGroups.size > 0 || selectedForms.size > 0 || selectedSuitability.size > 0;

    function clearAll() {
        setSelectedGroups(new Set());
        setSelectedForms(new Set());
        setSelectedSuitability(new Set());
    }

    return (
        <div className="min-h-screen w-full bg-green-100 flex flex-col">
            <NavBar />

            <main className="flex-1 w-full bg-white rounded-t-3xl mt-6">
                <div className="max-w-7xl mx-auto px-4 py-12">

                    {/* Page header */}
                    <div className="flex items-baseline justify-between mb-8">
                        <h1 className="text-3xl font-extrabold text-green-900">All Products</h1>
                        {hasActiveFilters && (
                            <button
                                onClick={clearAll}
                                className="text-sm text-green-600 hover:underline"
                            >
                                Clear all filters
                            </button>
                        )}
                    </div>

                    <div className="flex gap-8 items-start">

                        {/* ── Left sidebar ────────────────────────────────── */}
                        <aside className="w-56 flex-shrink-0 space-y-7">

                            {/* Sort */}
                            <FilterSection title="Sort">
                                {[
                                    { key: "az", label: "A – Z" },
                                    { key: "za", label: "Z – A" },
                                ].map((opt) => (
                                    <button
                                        key={opt.key}
                                        onClick={() => setSort(opt.key)}
                                        className={`w-full text-left text-sm px-3 py-1.5 rounded-lg transition ${
                                            sort === opt.key
                                                ? "bg-green-600 text-white font-semibold"
                                                : "text-gray-700 hover:bg-green-50"
                                        }`}
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </FilterSection>

                            {/* Refine: Need Group */}
                            <FilterSection title="Need Group">
                                {loading
                                    ? <p className="text-xs text-gray-300 animate-pulse">Loading…</p>
                                    : allNeedGroups.map((g) => (
                                        <CheckItem
                                            key={g.slug}
                                            label={g.name}
                                            checked={selectedGroups.has(g.slug)}
                                            onChange={() => toggleSet(setSelectedGroups, g.slug)}
                                        />
                                    ))
                                }
                            </FilterSection>

                            {/* Refine: Form Type */}
                            <FilterSection title="Form Type">
                                {loading
                                    ? <p className="text-xs text-gray-300 animate-pulse">Loading…</p>
                                    : allForms.map((form) => (
                                        <CheckItem
                                            key={form}
                                            label={form.charAt(0).toUpperCase() + form.slice(1)}
                                            checked={selectedForms.has(form)}
                                            onChange={() => toggleSet(setSelectedForms, form)}
                                        />
                                    ))
                                }
                            </FilterSection>

                            {/* Refine: Suitable For */}
                            <FilterSection title="Suitable For">
                                {SUITABILITY_OPTIONS.map((opt) => (
                                    <CheckItem
                                        key={opt.key}
                                        label={opt.label}
                                        checked={selectedSuitability.has(opt.key)}
                                        onChange={() => toggleSet(setSelectedSuitability, opt.key)}
                                    />
                                ))}
                                <p className="text-xs text-gray-400 mt-2 leading-snug">
                                    Based on product form. Always check the label.
                                </p>
                            </FilterSection>

                        </aside>

                        {/* ── Product list ─────────────────────────────────── */}
                        <div className="flex-1">

                            {/* Search bar */}
                            <div className="relative mb-5">
                                <span className="absolute inset-y-0 left-3 flex items-center text-gray-400 pointer-events-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                                    </svg>
                                </span>
                                <input
                                    type="text"
                                    placeholder="Search products…"
                                    value={nameSearch}
                                    onChange={(e) => setNameSearch(e.target.value)}
                                    className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
                                />
                                {nameSearch && (
                                    <button
                                        onClick={() => setNameSearch("")}
                                        className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
                                    >
                                        ✕
                                    </button>
                                )}
                            </div>

                            {/* Count */}
                            {!loading && (
                                <p className="text-sm text-gray-400 mb-4">
                                    {displayProducts.length} product{displayProducts.length !== 1 ? "s" : ""}
                                    {hasActiveFilters ? " match your filters" : ""}
                                </p>
                            )}

                            {/* Loading skeletons */}
                            {loading && (
                                <div className="grid grid-cols-3 gap-4">
                                    {Array.from({ length: 6 }).map((_, i) => (
                                        <div key={i} className="bg-green-50 rounded-xl h-48 animate-pulse" />
                                    ))}
                                </div>
                            )}

                            {/* Empty state */}
                            {!loading && displayProducts.length === 0 && (
                                <div className="text-center py-20 text-gray-400">
                                    No products match your search or filters.{" "}
                                    <button
                                        onClick={() => { clearAll(); setNameSearch(""); }}
                                        className="text-green-600 hover:underline"
                                    >
                                        Clear all
                                    </button>
                                </div>
                            )}

                            {/* Product cards */}
                            {!loading && (
                                <div className="grid grid-cols-3 gap-4">
                                    {displayProducts.map((p) => (
                                        <Link
                                            key={p.slug}
                                            to={`/products/${p.slug}`}
                                            state={{ slugList: displayProducts.map((x) => x.slug) }}
                                            className="relative flex flex-col bg-green-50 hover:bg-green-100 rounded-xl p-4 transition"
                                        >
                                            {/* Favourite star — logged in only */}
                                            {user && (
                                                <button
                                                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggle(p.slug); }}
                                                    title={favourites.has(p.slug) ? "Remove from Favourites" : "Add to Favourites"}
                                                    className="absolute top-2 right-2 z-10 w-7 h-7 flex items-center justify-center rounded-full bg-white/80 shadow hover:scale-110 transition-transform"
                                                >
                                                    <svg viewBox="0 0 24 24" className={`w-4 h-4 transition-colors ${favourites.has(p.slug) ? "fill-yellow-400 stroke-yellow-500" : "fill-none stroke-gray-400"}`} strokeWidth="1.8">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                                    </svg>
                                                </button>
                                            )}

                                            {/* Image */}
                                            {p.image_url ? (
                                                <img
                                                    src={p.image_url}
                                                    alt={p.name}
                                                    className="w-full h-36 object-contain rounded-lg bg-white shadow-sm mb-3"
                                                    loading="lazy"
                                                />
                                            ) : (
                                                <div className="w-full h-36 rounded-lg bg-white shadow-sm mb-3 flex items-center justify-center text-green-200 text-3xl">
                                                    ?
                                                </div>
                                            )}

                                            {/* Text */}
                                            <p className="font-semibold text-green-900 text-sm">{p.name}</p>
                                            {p.form && (
                                                <span className="text-xs text-green-600 capitalize bg-white border border-green-200 px-2 py-0.5 rounded-full inline-block mt-1 self-start">
                                                    {p.form}
                                                </span>
                                            )}
                                            {p.description && (
                                                <p className="text-xs text-gray-500 mt-1.5 line-clamp-2">
                                                    {p.description}
                                                </p>
                                            )}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

/* ── Reusable sidebar components ── */

function FilterSection({ title, children }) {
    return (
        <div>
            <p className="text-xs font-bold text-green-700 uppercase tracking-wider mb-2.5">
                {title}
            </p>
            <div className="space-y-1">{children}</div>
        </div>
    );
}

function CheckItem({ label, checked, onChange }) {
    return (
        <label className="flex items-start gap-2 cursor-pointer group">
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                className="accent-green-600 w-3.5 h-3.5 flex-shrink-0 mt-0.5"
            />
            <span className={`text-sm leading-snug ${
                checked ? "text-green-800 font-medium" : "text-gray-600 group-hover:text-gray-800"
            }`}>
                {label}
            </span>
        </label>
    );
}
