import { useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar.jsx";

const zones = {
    brain: {
        title: "Brain & Cognition",
        desc: "Supports memory, focus, and mental clarity.",
        supplements: [
            { name: "Lion's Mane Mushroom", slug: "lions-mane-mushroom" },
            { name: "Ginkgo Biloba", slug: "gingko-biloba" },
            { name: "Omega-3 Fish Oil", slug: "omega-3-fish-oil" },
        ],
    },
    eyes: {
        title: "Eye Health",
        desc: "Protects vision and reduces oxidative stress in retinal cells.",
        supplements: [
            { name: "Vit A", slug: "vit-a" },
            { name: "Omega-3 Fish Oil", slug: "omega-3-fish-oil" },
            { name: "Vit E", slug: "vit-e" },
        ],
    },
    thyroid: {
        title: "Thyroid",
        desc: "Supports healthy thyroid hormone production and metabolism.",
        supplements: [
            { name: "Iodine", slug: "iodine" },
            { name: "Selenium", slug: "selenium" },
            { name: "Zinc Supplements", slug: "zinc-supplements" },
        ],
    },
    heart: {
        title: "Heart & Cardiovascular",
        desc: "Supports healthy blood pressure, circulation, and cardiac function.",
        supplements: [
            { name: "Coenzyme Q10", slug: "coenzyme-q10" },
            { name: "Omega-3 Fish Oil", slug: "omega-3-fish-oil" },
            { name: "Magnesium Tablets", slug: "magnesium-tablets" },
        ],
    },
    gut: {
        title: "Gut & Digestion",
        desc: "Promotes a balanced microbiome and healthy digestion.",
        supplements: [
            { name: "Probiotics + Prebiotics", slug: "probiotics-prebiotics" },
            { name: "L-Glutamine", slug: "l-glutamine" },
            { name: "Apple Cider Vinegar", slug: "apple-cider-vinegar" },
        ],
    },
    muscles: {
        title: "Muscles",
        desc: "Supports muscle recovery, growth, and endurance.",
        supplements: [
            { name: "Creatine", slug: "creatine" },
            { name: "Whey Protein Powder", slug: "whey-protein-powder" },
            { name: "Magnesium Tablets", slug: "magnesium-tablets" },
        ],
    },
    joints: {
        title: "Joints",
        desc: "Reduces inflammation and supports cartilage and joint mobility.",
        supplements: [
            { name: "Glucosamine + Chondroitin", slug: "glucosamine-chondroitin" },
            { name: "Turmeric", slug: "turmeric" },
            { name: "MSM", slug: "msm" },
        ],
    },
    bones: {
        title: "Bones",
        desc: "Maintains bone density and supports skeletal strength.",
        supplements: [
            { name: "Calcium Supplements", slug: "calcium-supplements" },
            { name: "Vit D3", slug: "vit-d3" },
            { name: "Vit K2", slug: "vit-k2" },
        ],
    },
    skin: {
        title: "Skin",
        desc: "Promotes healthy skin tone, elasticity, and UV defence.",
        supplements: [
            { name: "Skin, Hair & Nails", slug: "skin-hair-and-nails" },
            { name: "Collagen Blends", slug: "collagen-blends" },
            { name: "Biotin", slug: "biotin" },
        ],
    },
};

function BodyMapSVG({ activeZone, onZoneClick }) {
    const zoneStyle = (id) => ({
        cursor: "pointer",
        opacity: activeZone && activeZone !== id ? 0.45 : 1,
        transition: "opacity 0.2s",
    });

    return (
        <svg
            viewBox="-90 0 380 520"
            width="380"
            height="520"
            xmlns="http://www.w3.org/2000/svg"
            style={{ fontFamily: "sans-serif" }}
        >
            {/* ── Silhouette ── */}
            <ellipse cx="130" cy="55" rx="36" ry="44" fill="#f5cba7" stroke="#c9956a" strokeWidth="1.5" />
            <rect x="117" y="95" width="26" height="22" rx="4" fill="#f5cba7" stroke="#c9956a" strokeWidth="1" />
            <rect x="85" y="114" width="90" height="120" rx="12" fill="#f5cba7" stroke="#c9956a" strokeWidth="1.5" />
            <rect x="51" y="118" width="32" height="100" rx="12" fill="#f5cba7" stroke="#c9956a" strokeWidth="1" />
            <rect x="177" y="118" width="32" height="100" rx="12" fill="#f5cba7" stroke="#c9956a" strokeWidth="1" />
            <rect x="51" y="220" width="32" height="60" rx="10" fill="#f5cba7" stroke="#c9956a" strokeWidth="1" />
            <rect x="177" y="220" width="32" height="60" rx="10" fill="#f5cba7" stroke="#c9956a" strokeWidth="1" />
            <ellipse cx="130" cy="248" rx="46" ry="18" fill="#f5cba7" stroke="#c9956a" strokeWidth="1" />
            <rect x="89" y="258" width="36" height="90" rx="12" fill="#f5cba7" stroke="#c9956a" strokeWidth="1.5" />
            <rect x="135" y="258" width="36" height="90" rx="12" fill="#f5cba7" stroke="#c9956a" strokeWidth="1.5" />
            <rect x="93" y="350" width="28" height="90" rx="10" fill="#f5cba7" stroke="#c9956a" strokeWidth="1" />
            <rect x="139" y="350" width="28" height="90" rx="10" fill="#f5cba7" stroke="#c9956a" strokeWidth="1" />
            <ellipse cx="107" cy="447" rx="20" ry="9" fill="#f5cba7" stroke="#c9956a" strokeWidth="1" />
            <ellipse cx="153" cy="447" rx="20" ry="9" fill="#f5cba7" stroke="#c9956a" strokeWidth="1" />

            {/* ── Zones ── */}
            {/* SKIN */}
            <ellipse cx="130" cy="55" rx="36" ry="44" fill="rgba(120,72,32,0.28)" stroke="#78481f" strokeWidth="1.5" strokeDasharray="5,3" onClick={() => onZoneClick("skin")} style={zoneStyle("skin")} />
            <rect x="85" y="114" width="90" height="120" rx="12" fill="rgba(120,72,32,0.24)" stroke="#78481f" strokeWidth="1.5" strokeDasharray="5,3" onClick={() => onZoneClick("skin")} style={zoneStyle("skin")} />

            {/* BRAIN */}
            <ellipse cx="130" cy="40" rx="28" ry="26" fill="rgba(139,92,246,0.35)" stroke="#7c3aed" strokeWidth="2" onClick={() => onZoneClick("brain")} style={zoneStyle("brain")} />

            {/* THYROID */}
            <rect x="117" y="100" width="26" height="18" rx="4" fill="rgba(220,38,38,0.4)" stroke="#dc2626" strokeWidth="2" onClick={() => onZoneClick("thyroid")} style={zoneStyle("thyroid")} />

            {/* HEART */}
            <ellipse cx="111" cy="148" rx="18" ry="20" fill="rgba(236,72,153,0.35)" stroke="#db2777" strokeWidth="2" onClick={() => onZoneClick("heart")} style={zoneStyle("heart")} />

            {/* GUT */}
            <ellipse cx="130" cy="195" rx="30" ry="28" fill="rgba(34,197,94,0.3)" stroke="#16a34a" strokeWidth="2" onClick={() => onZoneClick("gut")} style={zoneStyle("gut")} />

            {/* MUSCLES */}
            {[
                [51, 118, 32, 100], [177, 118, 32, 100],
                [89, 258, 36, 90], [135, 258, 36, 90],
            ].map(([x, y, w, h], i) => (
                <rect key={i} x={x} y={y} width={w} height={h} rx="12" fill="rgba(249,115,22,0.22)" stroke="#f97316" strokeWidth="1.5" strokeDasharray="6,3" onClick={() => onZoneClick("muscles")} style={zoneStyle("muscles")} />
            ))}

            {/* JOINTS */}
            {[
                [85, 120, 10], [175, 120, 10],
                [67, 220, 9],  [193, 220, 9],
                [107, 258, 10],[153, 258, 10],
                [107, 350, 9], [153, 350, 9],
            ].map(([cx, cy, r], i) => (
                <circle key={i} cx={cx} cy={cy} r={r} fill="rgba(59,130,246,0.4)" stroke="#2563eb" strokeWidth="2" onClick={() => onZoneClick("joints")} style={zoneStyle("joints")} />
            ))}

            {/* BONES */}
            <rect x="100" y="355" width="14" height="80" rx="4" fill="rgba(156,163,175,0.35)" stroke="#9ca3af" strokeWidth="1.5" strokeDasharray="4,4" onClick={() => onZoneClick("bones")} style={zoneStyle("bones")} />
            <rect x="146" y="355" width="14" height="80" rx="4" fill="rgba(156,163,175,0.35)" stroke="#9ca3af" strokeWidth="1.5" strokeDasharray="4,4" onClick={() => onZoneClick("bones")} style={zoneStyle("bones")} />

            {/* ── Leader lines & labels — LEFT side (4): Brain, Eyes, Heart, Gut ── */}
            <line x1="102" y1="40"  x2="-14" y2="42"  stroke="#7c3aed" strokeWidth="1" strokeDasharray="3,2" /><text x="-18" y="46"  fontSize="10" fill="#7c3aed" fontWeight="600" textAnchor="end">Brain</text>
            <line x1="108" y1="66"  x2="-14" y2="88"  stroke="#0d9488" strokeWidth="1" strokeDasharray="3,2" /><text x="-18" y="92"  fontSize="10" fill="#0d9488" fontWeight="600" textAnchor="end">Eyes</text>
            <line x1="93"  y1="148" x2="-14" y2="154" stroke="#db2777" strokeWidth="1" strokeDasharray="3,2" /><text x="-18" y="158" fontSize="10" fill="#db2777" fontWeight="600" textAnchor="end">Heart</text>
            <line x1="100" y1="195" x2="-14" y2="200" stroke="#16a34a" strokeWidth="1" strokeDasharray="3,2" /><text x="-18" y="204" fontSize="10" fill="#16a34a" fontWeight="600" textAnchor="end">Gut</text>

            {/* ── Leader lines & labels — RIGHT side (5): Skin, Thyroid, Muscles, Joints, Bones ── */}
            <line x1="166" y1="50"  x2="250" y2="52"  stroke="#78481f" strokeWidth="1" strokeDasharray="3,2" /><text x="254" y="56"  fontSize="10" fill="#78481f" fontWeight="600">Skin</text>
            <line x1="143" y1="109" x2="250" y2="105" stroke="#dc2626" strokeWidth="1" strokeDasharray="3,2" /><text x="254" y="109" fontSize="10" fill="#dc2626" fontWeight="600">Thyroid</text>
            <line x1="209" y1="165" x2="250" y2="165" stroke="#f97316" strokeWidth="1" strokeDasharray="3,2" /><text x="254" y="169" fontSize="10" fill="#f97316" fontWeight="600">Muscles</text>
            <line x1="185" y1="120" x2="250" y2="238" stroke="#2563eb" strokeWidth="1" strokeDasharray="3,2" /><text x="254" y="242" fontSize="10" fill="#2563eb" fontWeight="600">Joints</text>
            <line x1="167" y1="395" x2="250" y2="390" stroke="#9ca3af" strokeWidth="1" strokeDasharray="3,2" /><text x="254" y="394" fontSize="10" fill="#6b7280" fontWeight="600">Bones</text>

            {/* ── Eyes (rendered last, on top) ── */}
            <ellipse cx="118" cy="62" rx="8" ry="6" fill="white" stroke="#0d9488" strokeWidth="1.5" />
            <ellipse cx="142" cy="62" rx="8" ry="6" fill="white" stroke="#0d9488" strokeWidth="1.5" />
            <circle cx="118" cy="62" r="3" fill="#0d9488" />
            <circle cx="142" cy="62" r="3" fill="#0d9488" />
            <ellipse cx="118" cy="62" rx="10" ry="8" fill="transparent" onClick={() => onZoneClick("eyes")} style={{ ...zoneStyle("eyes"), cursor: "pointer" }} />
            <ellipse cx="142" cy="62" rx="10" ry="8" fill="transparent" onClick={() => onZoneClick("eyes")} style={{ ...zoneStyle("eyes"), cursor: "pointer" }} />
        </svg>
    );
}

export default function BodyMapPage() {
    const [activeZone, setActiveZone] = useState(null);

    const zone = activeZone ? zones[activeZone] : null;

    return (
        <div className="min-h-screen w-full bg-green-100 flex flex-col items-center">
            <NavBar />

            {/* Page header */}
            <section className="w-full bg-green-100 py-8">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-green-900 leading-tight">
                        Find supplements by body area
                    </h1>
                    <p className="text-green-700 mt-3 text-base sm:text-lg">
                        Click any highlighted area to discover relevant supplements.
                    </p>
                </div>
            </section>

            {/* Content card */}
            <section className="w-full bg-white rounded-t-3xl mt-4 py-12 flex-1">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="flex flex-col lg:flex-row items-start justify-center gap-12">

                        {/* SVG */}
                        <div className="flex-shrink-0 flex justify-center w-full lg:w-auto">
                            <BodyMapSVG activeZone={activeZone} onZoneClick={setActiveZone} />
                        </div>

                        {/* Info panel */}
                        <div className="flex-1 min-w-0">
                            {zone ? (
                                <div className="bg-green-50 border border-green-100 rounded-2xl p-7 shadow-sm">
                                    <h2 className="text-2xl font-bold text-green-900 mb-2">{zone.title}</h2>
                                    <p className="text-green-700 mb-6">{zone.desc}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {zone.supplements.map((s) => (
                                            <Link
                                                key={s.slug}
                                                to={`/products/${s.slug}`}
                                                className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-green-100 text-green-800 hover:bg-green-200 transition border border-green-200"
                                            >
                                                {s.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-green-50 border border-green-100 rounded-2xl p-7 shadow-sm flex items-center justify-center" style={{ minHeight: 200 }}>
                                    <p className="text-green-500 text-sm italic text-center">
                                        Click a coloured area on the body map to see relevant supplements.
                                    </p>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
}
