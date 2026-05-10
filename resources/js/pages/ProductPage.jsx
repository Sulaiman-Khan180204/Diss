import { useState, useEffect, useRef } from "react";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar.jsx";
import { fetchProduct, fetchProducts } from "../api.js";
import { getSuitabilityNote } from "../data/suitabilityNotes.js";
import { useAuth } from "../AuthContext.jsx";
import useFavourites from "../useFavourites.js";

function StarButton({ isFav, onToggle }) {
    return (
        <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); onToggle(); }}
            title={isFav ? "Remove from Favourites" : "Add to Favourites"}
            className="absolute top-2 right-2 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm shadow hover:scale-110 transition-transform"
        >
            <svg viewBox="0 0 24 24" className={`w-5 h-5 transition-colors ${isFav ? "fill-yellow-400 stroke-yellow-500" : "fill-none stroke-gray-400"}`} strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
        </button>
    );
}

function ProductImage({ url, name, isFav, onToggle, showStar }) {
    const [failed, setFailed] = useState(false);
    useEffect(() => { setFailed(false); }, [url]);
    const wrapper = "relative w-full lg:w-72 flex-shrink-0";
    if (!url || failed) {
        return (
            <div className={wrapper}>
                <div className="w-full lg:w-72 h-72 rounded-2xl bg-green-50 flex items-center justify-center text-green-300 text-5xl shadow-sm">
                    No image
                </div>
                {showStar && <StarButton isFav={isFav} onToggle={onToggle} />}
            </div>
        );
    }
    return (
        <div className={wrapper}>
            <img
                src={url}
                alt={name}
                className="w-full lg:w-72 h-72 object-contain rounded-2xl bg-green-50 p-6 shadow-sm"
                onError={() => setFailed(true)}
            />
            {showStar && <StarButton isFav={isFav} onToggle={onToggle} />}
        </div>
    );
}


function suitabilityItems(product) {
    const safeColor   = "text-green-700 bg-green-50 border-green-200";
    const warnColor   = "text-amber-700 bg-amber-50 border-amber-200";
    const dangerColor = "text-red-700 bg-red-50 border-red-200";
    const infoColor   = "text-blue-700 bg-blue-50 border-blue-200";

    const veganColor = product.vegan_friendly === "Yes" ? safeColor
        : product.vegan_friendly === "No" ? dangerColor : warnColor;
    const veganIcon  = product.vegan_friendly === "Yes" ? "✓"
        : product.vegan_friendly === "No" ? "✗" : "?";

    const pregColor = product.pregnancy_safe === "Yes" ? safeColor
        : product.pregnancy_safe === "Avoid" ? dangerColor : warnColor;
    const pregIcon  = product.pregnancy_safe === "Yes" ? "✓"
        : product.pregnancy_safe === "Avoid" ? "✗" : "?";

    const childColor = product.children_safe === "Yes" ? safeColor
        : product.children_safe === "No" ? dangerColor : warnColor;
    const childIcon  = product.children_safe === "Yes" ? "✓"
        : product.children_safe === "No" ? "✗" : "?";

    const slug = product.slug;
    return [
        { key: "age",      label: "Age Group",      value: product.suitable_age   || "—", icon: "★", color: infoColor,   note: getSuitabilityNote(slug, "age",      product.suitable_age) },
        { key: "vegan",    label: "Vegan Friendly",  value: product.vegan_friendly || "—", icon: veganIcon, color: veganColor, note: getSuitabilityNote(slug, "vegan",    product.vegan_friendly) },
        { key: "pregnancy",label: "Pregnancy",       value: product.pregnancy_safe || "—", icon: pregIcon,  color: pregColor,  note: getSuitabilityNote(slug, "pregnancy",product.pregnancy_safe) },
        { key: "children", label: "Children",        value: product.children_safe  || "—", icon: childIcon, color: childColor, note: getSuitabilityNote(slug, "children", product.children_safe) },
    ];
}

export default function ProductPage() {
    const { slug } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [slugList, setSlugList] = useState(location.state?.slugList ?? []);
    const [activeTooltip, setActiveTooltip] = useState(null);
    const tooltipRef = useRef(null);

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { user } = useAuth();
    const { favourites, toggle } = useFavourites();

    useEffect(() => {
        if (!location.state?.slugList) {
            fetchProducts().then((all) => setSlugList(all.map((p) => p.slug).sort((a, b) => a.localeCompare(b)))).catch(() => {});
        }
    }, []);

    const currentIdx = slugList.indexOf(slug);
    const prevSlug   = currentIdx > 0 ? slugList[currentIdx - 1] : null;
    const nextSlug   = currentIdx !== -1 && currentIdx < slugList.length - 1 ? slugList[currentIdx + 1] : null;

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
                <div className="max-w-5xl mx-auto px-4">

                    {/* Loading skeleton */}
                    {loading && (
                        <div className="animate-pulse space-y-6">
                            <div className="h-5 bg-green-50 rounded w-16" />
                            <div className="flex gap-8">
                                <div className="w-72 h-72 bg-green-50 rounded-2xl flex-shrink-0" />
                                <div className="flex-1 space-y-4 pt-2">
                                    <div className="h-8 bg-green-50 rounded w-2/3" />
                                    <div className="h-4 bg-green-50 rounded w-1/4" />
                                    <div className="h-24 bg-green-50 rounded" />
                                    <div className="h-6 bg-green-50 rounded w-1/3" />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Error */}
                    {error && (
                        <div className="text-center py-20">
                            <p className="text-red-500 mb-4">{error}</p>
                            <Link to="/" className="text-green-700 underline">Back to home</Link>
                        </div>
                    )}

                    {product && (
                        <div className="space-y-10">
                            <div className="flex items-center justify-between">
                                <Link to="/products" state={location.state} className="text-sm text-green-600 hover:underline">← All Products</Link>
                                {slugList.length > 1 && (
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => prevSlug && navigate(`/products/${prevSlug}`, { state: location.state })}
                                            disabled={!prevSlug}
                                            className="px-3 py-1 text-sm rounded-lg bg-green-100 hover:bg-green-200 text-green-800 disabled:opacity-30 disabled:cursor-not-allowed transition"
                                        >
                                            ← Prev
                                        </button>
                                        <span className="text-xs text-gray-400">{currentIdx + 1} / {slugList.length}</span>
                                        <button
                                            onClick={() => nextSlug && navigate(`/products/${nextSlug}`, { state: location.state })}
                                            disabled={!nextSlug}
                                            className="px-3 py-1 text-sm rounded-lg bg-green-100 hover:bg-green-200 text-green-800 disabled:opacity-30 disabled:cursor-not-allowed transition"
                                        >
                                            Next →
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* ── Hero: image + info ──────────────────────────── */}
                            <div className="flex flex-col lg:flex-row gap-10 items-start">

                                {/* Product image */}
                                <div className="flex-shrink-0 w-full lg:w-72">
                                    <ProductImage
                                        url={product.image_url}
                                        name={product.name}
                                        isFav={favourites.has(product.slug)}
                                        onToggle={() => toggle(product.slug)}
                                        showStar={!!user}
                                    />

                                    {/* Main Extracts below the product image */}
                                    {product.compounds?.length > 0 && (
                                        <div className="mt-4">
                                            <p className="text-xs text-green-600 font-medium mb-2 uppercase tracking-wide">Main Extracts</p>
                                            <div className="space-y-1.5">
                                                {product.compounds.map((compound) => (
                                                    <Link
                                                        key={compound.id}
                                                        to={`/compound-explorer/${compound.slug}`}
                                                        className="block bg-white border border-green-100 hover:border-green-300 hover:bg-green-50 rounded-xl px-3 py-2 shadow-sm transition group"
                                                    >
                                                        <p className="text-xs font-semibold text-green-900 leading-tight group-hover:text-green-700">{compound.name}</p>
                                                        {compound.description && (
                                                            <p className="text-xs text-gray-400 mt-0.5 leading-snug">{compound.description}</p>
                                                        )}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Product info */}
                                <div className="flex-1 space-y-4 pt-1">
                                    <div>
                                        <h1 className="text-3xl font-extrabold text-green-900 leading-tight">{product.name}</h1>
                                        {product.form && (
                                            <span className="mt-2 inline-block text-sm text-green-600 capitalize bg-green-50 border border-green-200 px-3 py-0.5 rounded-full">
                                                {product.form}
                                            </span>
                                        )}
                                    </div>

                                    {product.description && (
                                        <p className="text-gray-600 leading-relaxed text-base">{product.description}</p>
                                    )}

                                    {/* Suitable for */}
                                    <div className="rounded-xl border border-gray-200 bg-white px-4 py-3">
                                        <div className="flex items-center justify-between mb-1">
                                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Suitable For</p>
                                            <span className="text-xs text-gray-400 italic">Tap a tile for more info</span>
                                        </div>
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2">
                                            {suitabilityItems(product).map((item) => (
                                                <div key={item.key} className="relative">
                                                    <button
                                                        type="button"
                                                        className={`w-full flex flex-col items-center text-center rounded-xl border px-3 py-3 cursor-pointer select-none transition-opacity ${item.color} ${activeTooltip === item.key ? 'ring-2 ring-offset-1 ring-current' : ''}`}
                                                        onMouseEnter={() => setActiveTooltip(item.key)}
                                                        onMouseLeave={() => setActiveTooltip(null)}
                                                        onClick={() => setActiveTooltip(activeTooltip === item.key ? null : item.key)}
                                                        aria-expanded={activeTooltip === item.key}
                                                        aria-label={`${item.label}: ${item.value}. Click for more information.`}
                                                    >
                                                        <span className="text-xl font-bold mb-1">{item.icon}</span>
                                                        <span className="text-xs font-semibold leading-snug">{item.label}</span>
                                                        <span className="text-xs opacity-75 mt-0.5">{item.value}</span>
                                                        <span className="text-xs mt-1 opacity-50 font-medium">ⓘ</span>
                                                    </button>

                                                    {/* Tooltip */}
                                                    {activeTooltip === item.key && item.note && (
                                                        <div
                                                            ref={tooltipRef}
                                                            className="absolute z-20 bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 bg-gray-900 text-white text-xs rounded-xl px-3 py-2.5 shadow-xl leading-relaxed"
                                                            role="tooltip"
                                                        >
                                                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
                                                            {item.note}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                        <p className="mt-2 text-xs text-gray-400 italic">Always read the label and consult a healthcare professional if unsure.</p>
                                    </div>

                                    {/* Groups / Conditions box */}
                                    {product.conditions?.length > 0 && (
                                        <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3">
                                            <p className="text-xs font-semibold text-green-700 uppercase tracking-wide mb-2">Supports</p>
                                            <div className="flex flex-wrap gap-2">
                                                {product.conditions.map((c) => (
                                                    <Link
                                                        key={c.slug}
                                                        to={`/conditions/${c.slug}`}
                                                        className="text-sm bg-white border border-green-300 text-green-800 hover:bg-green-100 px-3 py-1 rounded-full transition"
                                                    >
                                                        {c.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                </div>
                            </div>

                            {/* Disclaimer */}
                            <p className="text-xs text-green-700 text-center max-w-3xl mx-auto border-t border-green-100 pt-6">
                                This is general wellbeing information and not medical advice. If symptoms persist or you are taking
                                medication, please consult a healthcare professional.
                            </p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
