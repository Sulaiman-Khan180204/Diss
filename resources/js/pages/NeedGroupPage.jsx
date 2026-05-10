import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import NavBar from "../components/NavBar.jsx";
import ProductCard from "../components/ProductCard.jsx";
import { fetchNeedGroup } from "../api.js";

export default function NeedGroupPage() {
    const { slug } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        fetchNeedGroup(slug)
            .then(setData)
            .catch(() => setError("Category not found."))
            .finally(() => setLoading(false));
    }, [slug]);

    const group = data?.group;
    const products = data?.products ?? [];

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

                    {group && (
                        <>
                            <div className="mb-8">
                                <Link to="/" className="text-sm text-green-600 hover:underline">← Back</Link>
                                <h1 className="mt-2 text-3xl font-extrabold text-green-900">{group.name}</h1>

                                {/* Sub-conditions as filter chips */}
                                {group.conditions?.length > 0 && (
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {group.conditions.map((cond) => (
                                            <Link
                                                key={cond.slug}
                                                to={`/conditions/${cond.slug}`}
                                                className="text-sm bg-green-100 text-green-800 hover:bg-green-200 px-3 py-1 rounded-full transition"
                                            >
                                                {cond.name}
                                            </Link>
                                        ))}
                                    </div>
                                )}

                                <p className="mt-3 text-green-700 text-sm">
                                    {products.length} product{products.length !== 1 ? "s" : ""} in this category
                                </p>
                            </div>

                            {products.length === 0 ? (
                                <p className="text-gray-500">No products found for this category yet.</p>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {products.map((product) => (
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
