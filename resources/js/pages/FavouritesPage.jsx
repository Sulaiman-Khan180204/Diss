import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar.jsx";
import { fetchFavouriteProducts } from "../api.js";
import useFavourites from "../useFavourites.js";

export default function FavouritesPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading]   = useState(true);
    const { favourites, toggle }  = useFavourites();

    useEffect(() => {
        fetchFavouriteProducts()
            .then(setProducts)
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    const displayed = products.filter((p) => favourites.has(p.slug));

    return (
        <div className="min-h-screen w-full bg-green-100 flex flex-col">
            <NavBar />

            <main className="flex-1 w-full bg-white rounded-t-3xl mt-6">
                <div className="max-w-7xl mx-auto px-4 py-12">

                    <div className="flex items-baseline justify-between mb-8">
                        <h1 className="text-3xl font-extrabold text-green-900">My Favourites</h1>
                        <Link to="/products" className="text-sm text-green-600 hover:underline">← All Products</Link>
                    </div>

                    {loading && (
                        <div className="grid grid-cols-3 gap-4">
                            {Array.from({ length: 3 }).map((_, i) => (
                                <div key={i} className="bg-green-50 rounded-xl h-48 animate-pulse" />
                            ))}
                        </div>
                    )}

                    {!loading && displayed.length === 0 && (
                        <div className="text-center py-24 text-gray-400 space-y-3">
                            <p className="text-5xl">☆</p>
                            <p className="text-lg font-medium">No favourites yet</p>
                            <p className="text-sm">Tap the star on any product to save it here.</p>
                            <Link to="/products" className="inline-block mt-3 text-green-600 hover:underline text-sm font-medium">
                                Browse products
                            </Link>
                        </div>
                    )}

                    {!loading && displayed.length > 0 && (
                        <div className="grid grid-cols-3 gap-4">
                            {displayed.map((p) => (
                                <div key={p.slug} className="relative flex flex-col bg-green-50 rounded-xl p-4">
                                    {/* Remove star */}
                                    <button
                                        onClick={() => toggle(p.slug)}
                                        title="Remove from Favourites"
                                        className="absolute top-2 right-2 z-10 w-7 h-7 flex items-center justify-center rounded-full bg-white/80 shadow hover:scale-110 transition-transform"
                                    >
                                        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-yellow-400 stroke-yellow-500" strokeWidth="1.8">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                        </svg>
                                    </button>

                                    <Link to={`/products/${p.slug}`} className="flex flex-col flex-1">
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
                                        <p className="font-semibold text-green-900 text-sm">{p.name}</p>
                                        {p.form && (
                                            <span className="text-xs text-green-600 capitalize bg-white border border-green-200 px-2 py-0.5 rounded-full inline-block mt-1 self-start">
                                                {p.form}
                                            </span>
                                        )}
                                        {p.description && (
                                            <p className="text-xs text-gray-500 mt-1.5 line-clamp-2">{p.description}</p>
                                        )}
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
