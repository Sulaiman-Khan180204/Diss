import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import NavBar from "../components/NavBar.jsx";
import ProductCard from "../components/ProductCard.jsx";
import { fetchCondition } from "../api.js";

export default function ConditionPage() {
    const { slug } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        fetchCondition(slug)
            .then(setData)
            .catch(() => setError("Could not load this page."))
            .finally(() => setLoading(false));
    }, [slug]);

    return (
        <div className="min-h-screen w-full bg-green-100 flex flex-col">
            <NavBar />

            <main className="flex-1 w-full bg-white rounded-t-3xl mt-6 py-12">
                <div className="max-w-6xl mx-auto px-4">

                    {loading && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {Array.from({ length: 8 }).map((_, i) => (
                                <div key={i} className="bg-green-50 rounded-xl h-52 animate-pulse" />
                            ))}
                        </div>
                    )}

                    {error && (
                        <div className="text-center py-20">
                            <p className="text-red-500 mb-4">{error}</p>
                            <Link to="/" className="text-green-700 underline">Back to home</Link>
                        </div>
                    )}

                    {data && (
                        <>
                            <div className="mb-8">
                                <Link to="/" className="text-sm text-green-600 hover:underline">← Back</Link>
                                <h1 className="mt-2 text-3xl font-extrabold text-green-900">{data.condition.name}</h1>
                                <p className="mt-1 text-green-700 text-sm">
                                    {data.products.length} product{data.products.length !== 1 ? "s" : ""} found
                                </p>
                            </div>

                            {data.products.length === 0 ? (
                                <p className="text-gray-500">No products found for this condition.</p>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {data.products.map((product) => (
                                        <ProductCard key={product.slug} product={product} />
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </main>
        </div>
    );
}
