import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import NavBar from "../components/NavBar.jsx";
import { fetchProduct } from "../api.js";

const EVIDENCE_LABEL = { A: "Strong", B: "Moderate", C: "Emerging" };
const EVIDENCE_COLOR = {
    A: "bg-green-100 text-green-800",
    B: "bg-yellow-100 text-yellow-800",
    C: "bg-gray-100 text-gray-700",
};

export default function ProductPage() {
    const { slug } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        fetchProduct(slug)
            .then(setProduct)
            .catch(() => setError("Product not found."))
            .finally(() => setLoading(false));
    }, [slug]);

    return (
        <div className="min-h-screen w-full bg-green-100 flex flex-col">
            <NavBar />

            <main className="flex-1 w-full bg-white rounded-t-3xl mt-6 py-12">
                <div className="max-w-4xl mx-auto px-4">

                    {loading && (
                        <div className="animate-pulse space-y-4">
                            <div className="h-8 bg-green-50 rounded w-1/3" />
                            <div className="h-64 bg-green-50 rounded" />
                            <div className="h-4 bg-green-50 rounded w-2/3" />
                        </div>
                    )}

                    {error && (
                        <div className="text-center py-20">
                            <p className="text-red-500 mb-4">{error}</p>
                            <Link to="/" className="text-green-700 underline">Back to home</Link>
                        </div>
                    )}

                    {product && (
                        <>
                            <Link to="/" className="text-sm text-green-600 hover:underline">← Back</Link>

                            <div className="mt-4 flex flex-col sm:flex-row gap-8">
                                {/* Image */}
                                {product.image_url && (
                                    <div className="flex-shrink-0 flex items-start justify-center">
                                        <img
                                            src={product.image_url}
                                            alt={product.name}
                                            className="w-48 h-48 object-contain rounded-xl bg-green-50 p-4"
                                        />
                                    </div>
                                )}

                                {/* Info */}
                                <div className="flex-1">
                                    <h1 className="text-3xl font-extrabold text-green-900">{product.name}</h1>
                                    {product.form && (
                                        <span className="mt-1 inline-block text-sm text-green-600 capitalize bg-green-50 px-3 py-0.5 rounded-full">
                                            {product.form}
                                        </span>
                                    )}
                                    {product.description && (
                                        <p className="mt-4 text-gray-700 leading-relaxed">{product.description}</p>
                                    )}
                                </div>
                            </div>

                            {/* Conditions */}
                            {product.conditions?.length > 0 && (
                                <section className="mt-10">
                                    <h2 className="text-lg font-semibold text-green-900 mb-3">Supports</h2>
                                    <div className="flex flex-wrap gap-2">
                                        {product.conditions.map((c) => (
                                            <Link
                                                key={c.slug}
                                                to={`/conditions/${c.slug}`}
                                                className="text-sm bg-green-100 text-green-800 hover:bg-green-200 px-3 py-1 rounded-full transition"
                                            >
                                                {c.name}
                                            </Link>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Ingredients */}
                            {product.ingredients?.length > 0 && (
                                <section className="mt-10">
                                    <h2 className="text-lg font-semibold text-green-900 mb-3">Key Ingredients</h2>
                                    <div className="space-y-3">
                                        {product.ingredients.map((ing) => (
                                            <div key={ing.id} className="flex items-start gap-3 bg-gray-50 rounded-xl p-4">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 flex-wrap">
                                                        <span className="font-medium text-gray-900">{ing.name}</span>
                                                        {ing.evidence_level && (
                                                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${EVIDENCE_COLOR[ing.evidence_level] ?? "bg-gray-100 text-gray-600"}`}>
                                                                {EVIDENCE_LABEL[ing.evidence_level] ?? ing.evidence_level} evidence
                                                            </span>
                                                        )}
                                                        {ing.pivot?.amount_mg && (
                                                            <span className="text-xs text-gray-500">{ing.pivot.amount_mg} mg</span>
                                                        )}
                                                        {ing.pivot?.form_note && (
                                                            <span className="text-xs text-gray-500 italic">({ing.pivot.form_note})</span>
                                                        )}
                                                    </div>
                                                    {ing.short_benefits && (
                                                        <p className="mt-1 text-sm text-gray-600">{ing.short_benefits}</p>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            <p className="mt-12 text-xs text-green-700 text-center max-w-3xl mx-auto">
                                This is general wellbeing information and not medical advice. If symptoms persist or you're taking
                                medication, please consult a healthcare professional.
                            </p>
                        </>
                    )}
                </div>
            </main>
        </div>
    );
}
