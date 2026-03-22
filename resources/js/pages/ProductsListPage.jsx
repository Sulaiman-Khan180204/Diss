import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar.jsx";
import { fetchProducts } from "../api.js";

export default function ProductsListPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts()
            .then(setProducts)
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="min-h-screen w-full bg-green-100 flex flex-col">
            <NavBar />

            <main className="flex-1 w-full bg-white rounded-t-3xl mt-6 py-12">
                <div className="max-w-6xl mx-auto px-4">
                    <h1 className="text-3xl font-extrabold text-green-900 mb-8">All Products</h1>

                    {loading && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <div key={i} className="bg-green-50 rounded-xl h-40 animate-pulse" />
                            ))}
                        </div>
                    )}

                    {!loading && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products.map((p) => (
                                <Link
                                    key={p.slug}
                                    to={`/products/${p.slug}`}
                                    className="flex items-center gap-4 bg-green-50 hover:bg-green-100 rounded-xl p-4 transition"
                                >
                                    {p.image_url && (
                                        <img
                                            src={p.image_url}
                                            alt={p.name}
                                            className="w-16 h-16 object-contain rounded-lg bg-white flex-shrink-0"
                                        />
                                    )}
                                    <div>
                                        <p className="font-semibold text-green-900">{p.name}</p>
                                        {p.form && (
                                            <p className="text-xs text-green-600 capitalize mt-0.5">{p.form}</p>
                                        )}
                                        {p.description && (
                                            <p className="text-sm text-gray-600 mt-1 line-clamp-2">{p.description}</p>
                                        )}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
