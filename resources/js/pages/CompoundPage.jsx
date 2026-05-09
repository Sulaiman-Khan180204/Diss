import { useState, useEffect, useRef } from "react";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar.jsx";
import { fetchCompound, fetchCompounds } from "../api.js";

function ProductThumb({ imageUrl, name }) {
    const [failed, setFailed] = useState(false);
    useEffect(() => { setFailed(false); }, [imageUrl]);
    if (!imageUrl || failed) {
        return (
            <div className="w-full aspect-square rounded-lg bg-white shadow-sm mb-2 flex items-center justify-center text-green-200 text-xl">?</div>
        );
    }
    return (
        <img
            src={imageUrl}
            alt={name}
            className="w-full aspect-square object-contain rounded-lg bg-white shadow-sm mb-2"
            onError={() => setFailed(true)}
        />
    );
}

export default function CompoundPage() {
    const { slug } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [slugList, setSlugList] = useState(location.state?.slugList ?? []);

    const [compound, setCompound] = useState(null);
    const [loading, setLoading]   = useState(true);
    const [error, setError]       = useState(null);
    const scrollRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft]   = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const updateScrollState = () => {
        const el = scrollRef.current;
        if (!el) return;
        setCanScrollLeft(el.scrollLeft > 0);
        setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
    };

    const scrollLeft  = () => scrollRef.current?.scrollBy({ left: -220, behavior: "smooth" });
    const scrollRight = () => scrollRef.current?.scrollBy({ left: 220, behavior: "smooth" });

    useEffect(() => {
        if (!location.state?.slugList) {
            fetchCompounds().then((all) => setSlugList(all.map((c) => c.slug))).catch(() => {});
        }
    }, []);

    const currentIdx = slugList.indexOf(slug);
    const prevSlug   = currentIdx > 0 ? slugList[currentIdx - 1] : null;
    const nextSlug   = currentIdx !== -1 && currentIdx < slugList.length - 1 ? slugList[currentIdx + 1] : null;

    useEffect(() => {
        setCanScrollLeft(false);
        setCanScrollRight(false);
        setLoading(true);
        setError(null);
        fetchCompound(slug)
            .then(setCompound)
            .catch(() => setError("Compound not found."))
            .finally(() => setLoading(false));
    }, [slug]);

    useEffect(() => {
        if (compound?.products?.length > 5) {
            setTimeout(updateScrollState, 50);
        }
    }, [compound]);

    return (
        <div className="min-h-screen w-full bg-green-100 flex flex-col">
            <NavBar />

            <main className="flex-1 w-full bg-white rounded-t-3xl mt-6 py-12">
                <div className="max-w-5xl mx-auto px-4">

                    {/* Loading */}
                    {loading && (
                        <div className="animate-pulse space-y-6">
                            <div className="h-4 bg-green-50 rounded w-32" />
                            <div className="flex gap-8">
                                <div className="w-64 h-64 bg-green-50 rounded-xl flex-shrink-0" />
                                <div className="flex-1 space-y-4 pt-2">
                                    <div className="h-8 bg-green-50 rounded w-2/3" />
                                    <div className="h-4 bg-green-50 rounded w-1/3" />
                                    <div className="h-24 bg-green-50 rounded" />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Error */}
                    {error && (
                        <div className="text-center py-20">
                            <p className="text-red-500 mb-4">{error}</p>
                            <Link to="/compound-explorer" className="text-green-700 underline">
                                Back to Compound Explorer
                            </Link>
                        </div>
                    )}

                    {compound && (
                        <div className="space-y-8">

                            {/* Back + Prev/Next */}
                            <div className="flex items-center justify-between">
                                <Link to="/compound-explorer" state={location.state} className="text-sm text-green-600 hover:underline">
                                    ← Compound Explorer
                                </Link>
                                {slugList.length > 1 && (
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => prevSlug && navigate(`/compound-explorer/${prevSlug}`, { state: location.state })}
                                            disabled={!prevSlug}
                                            className="px-3 py-1 text-sm rounded-lg bg-green-100 hover:bg-green-200 text-green-800 disabled:opacity-30 disabled:cursor-not-allowed transition"
                                        >
                                            ← Prev
                                        </button>
                                        <span className="text-xs text-gray-400">{currentIdx + 1} / {slugList.length}</span>
                                        <button
                                            onClick={() => nextSlug && navigate(`/compound-explorer/${nextSlug}`, { state: location.state })}
                                            disabled={!nextSlug}
                                            className="px-3 py-1 text-sm rounded-lg bg-green-100 hover:bg-green-200 text-green-800 disabled:opacity-30 disabled:cursor-not-allowed transition"
                                        >
                                            Next →
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* ── Hero: image + label left, mechanism right ── */}
                            <div className="flex flex-col lg:flex-row gap-8 items-start">

                                {/* Left column: image + name info stacked below */}
                                <div className="flex-shrink-0 w-64 space-y-3">
                                    <div className="w-64 h-64 rounded-xl bg-green-50 border-2 border-dashed border-green-200 flex flex-col items-center justify-center text-green-300 gap-1 overflow-hidden">
                                        {compound.image_url ? (
                                            <img
                                                src={compound.image_url}
                                                alt={compound.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <>
                                                <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v13.5A1.5 1.5 0 003.75 21zM16.5 7.5a.75.75 0 110 1.5.75.75 0 010-1.5z" />
                                                </svg>
                                                <span className="text-xs">Coming soon</span>
                                            </>
                                        )}
                                    </div>

                                    {/* Name + labels below image */}
                                    <div>
                                        {compound.category && (
                                            <span className="text-xs font-semibold text-green-600 uppercase tracking-wide">
                                                {compound.category}
                                            </span>
                                        )}
                                        <h1 className="text-lg font-extrabold text-green-900 leading-tight mt-0.5">
                                            {compound.name}
                                        </h1>
                                        {compound.ingredient && (
                                            <p className="text-xs text-gray-500 mt-0.5">
                                                Extract of{" "}
                                                <span className="font-medium text-gray-700">{compound.ingredient.name}</span>
                                            </p>
                                        )}
                                        {compound.description && (
                                            <p className="text-xs text-gray-400 italic mt-1 leading-snug">{compound.description}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Right column: mechanism + found in stacked */}
                                <div className="flex-1 min-w-0 space-y-4">
                                    {compound.mechanism && (
                                        <div>
                                            <h2 className="text-base font-bold text-green-900 mb-2">How it works</h2>
                                            <div className="bg-green-50 border border-green-100 rounded-xl px-5 py-4">
                                                <p className="text-sm text-gray-700 leading-relaxed">{compound.mechanism}</p>
                                            </div>
                                        </div>
                                    )}

                                    {/* ── Found in ──────────────────────────── */}
                                    {compound.products?.length > 0 && (
                                        <div>
                                            <h2 className="text-base font-bold text-green-900 mb-2">Found in:</h2>
                                            <div className="relative flex items-center gap-2">
                                                {canScrollLeft && (
                                                    <button
                                                        onClick={scrollLeft}
                                                        className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 hover:bg-green-200 flex items-center justify-center text-green-700 transition"
                                                        aria-label="Scroll left"
                                                    >
                                                        ‹
                                                    </button>
                                                )}

                                                <div
                                                    ref={scrollRef}
                                                    className="flex gap-3 overflow-x-auto scroll-smooth"
                                                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                                                    onScroll={updateScrollState}
                                                >
                                                    {compound.products.map((p) => (
                                                        <Link
                                                            key={p.slug}
                                                            to={`/products/${p.slug}`}
                                                            className="flex-shrink-0 flex flex-col bg-green-50 hover:bg-green-100 rounded-xl p-3 transition w-32"
                                                        >
                                                            <ProductThumb imageUrl={p.image_url} name={p.name} />
                                                            <p className="font-semibold text-green-900 text-xs leading-snug">
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

                                                {canScrollRight && (
                                                <button
                                                    onClick={scrollRight}
                                                    className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 hover:bg-green-200 flex items-center justify-center text-green-700 transition"
                                                    aria-label="Scroll right"
                                                >
                                                    ›
                                                </button>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Disclaimer */}
                            <p className="text-xs text-green-700 text-center border-t border-green-100 pt-6">
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
