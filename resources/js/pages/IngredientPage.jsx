import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import NavBar from "../components/NavBar.jsx";
import { fetchIngredient } from "../api.js";

const EVIDENCE_META = {
    A: { label: "Strong evidence",   color: "bg-green-100 text-green-800 border-green-300" },
    B: { label: "Moderate evidence", color: "bg-amber-100 text-amber-800 border-amber-300" },
    C: { label: "Limited evidence",  color: "bg-gray-100 text-gray-600 border-gray-300" },
};

export default function IngredientPage() {
    const { slug } = useParams();
    const [ingredient, setIngredient] = useState(null);
    const [loading, setLoading]       = useState(true);
    const [error, setError]           = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        fetchIngredient(slug)
            .then(setIngredient)
            .catch(() => setError("Ingredient not found."))
            .finally(() => setLoading(false));
    }, [slug]);

    return (
        <div className="min-h-screen w-full bg-green-100 flex flex-col">
            <NavBar />

            <main className="flex-1 w-full bg-white rounded-t-3xl mt-6 py-12">
                <div className="max-w-4xl mx-auto px-4">

                    {/* Loading */}
                    {loading && (
                        <div className="animate-pulse space-y-6">
                            <div className="h-4 bg-green-50 rounded w-24" />
                            <div className="h-9 bg-green-50 rounded w-1/2" />
                            <div className="h-4 bg-green-50 rounded w-2/3" />
                            <div className="h-40 bg-green-50 rounded" />
                        </div>
                    )}

                    {/* Error */}
                    {error && (
                        <div className="text-center py-20">
                            <p className="text-red-500 mb-4">{error}</p>
                            <Link to="/ingredient-explorer" className="text-green-700 underline">
                                Back to Ingredient Explorer
                            </Link>
                        </div>
                    )}

                    {ingredient && (
                        <div className="space-y-10">

                            {/* Back */}
                            <Link to="/ingredient-explorer" className="text-sm text-green-600 hover:underline">
                                ← Ingredient Explorer
                            </Link>

                            {/* ── Hero ─────────────────────────────────────── */}
                            <div>
                                <div className="flex items-start gap-4 flex-wrap">
                                    <h1 className="text-3xl font-extrabold text-green-900 leading-tight">
                                        {ingredient.name}
                                    </h1>
                                    {ingredient.evidence_level && (
                                        <EvidenceBadge level={ingredient.evidence_level} />
                                    )}
                                </div>

                                {ingredient.short_benefits && (
                                    <p className="mt-3 text-gray-600 leading-relaxed text-base max-w-2xl">
                                        {ingredient.short_benefits}
                                    </p>
                                )}
                            </div>

                            {/* ── Compound Extracts ─────────────────────────── */}
                            {ingredient.compounds?.length > 0 && (
                                <section>
                                    <h2 className="text-lg font-bold text-green-900 mb-1">
                                        Compound Extracts
                                    </h2>
                                    <p className="text-sm text-gray-400 mb-4">
                                        The specific chemical forms and standardised extracts used in supplements.
                                    </p>
                                    <div className="flex flex-col gap-4">
                                        {ingredient.compounds.map((compound) => (
                                            <div
                                                key={compound.id}
                                                className="bg-green-50 border border-green-100 rounded-xl px-5 py-4"
                                            >
                                                <p className="font-semibold text-green-900 text-sm">
                                                    {compound.name}
                                                </p>
                                                {compound.description && (
                                                    <p className="text-xs text-gray-500 mt-1 leading-snug">
                                                        {compound.description}
                                                    </p>
                                                )}
                                                {compound.mechanism && (
                                                    <p className="text-sm text-gray-700 mt-3 leading-relaxed border-t border-green-100 pt-3">
                                                        {compound.mechanism}
                                                    </p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* ── Products ─────────────────────────────────── */}
                            {ingredient.products?.length > 0 && (
                                <section>
                                    <h2 className="text-lg font-bold text-green-900 mb-4">
                                        Products containing {ingredient.name}
                                    </h2>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                        {ingredient.products.map((p) => (
                                            <Link
                                                key={p.slug}
                                                to={`/products/${p.slug}`}
                                                className="flex flex-col bg-green-50 hover:bg-green-100 rounded-xl p-4 transition"
                                            >
                                                {p.image_url ? (
                                                    <img
                                                        src={p.image_url}
                                                        alt={p.name}
                                                        className="w-full h-28 object-contain rounded-lg bg-white shadow-sm mb-3"
                                                    />
                                                ) : (
                                                    <div className="w-full h-28 rounded-lg bg-white shadow-sm mb-3 flex items-center justify-center text-green-200 text-3xl">
                                                        ?
                                                    </div>
                                                )}
                                                <p className="font-semibold text-green-900 text-sm leading-snug">
                                                    {p.name}
                                                </p>
                                                {p.form && (
                                                    <span className="text-xs text-green-600 capitalize bg-white border border-green-200 px-2 py-0.5 rounded-full inline-block mt-1 self-start">
                                                        {p.form}
                                                    </span>
                                                )}
                                            </Link>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Disclaimer */}
                            <p className="text-xs text-green-700 text-center max-w-3xl mx-auto border-t border-green-100 pt-6">
                                This is general wellbeing information and not medical advice. Always consult a
                                healthcare professional before starting any supplement.
                            </p>
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
        <span className={`mt-1 text-sm font-semibold px-3 py-1 rounded-full border ${meta.color}`}>
            {level} — {meta.label}
        </span>
    );
}
