import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar.jsx";
import { useAuth } from "../AuthContext.jsx";

const GOAL_LABELS = {
    energy:   "Energy & Fatigue",
    sleep:    "Sleep Quality",
    immunity: "Immune Support",
    joints:   "Joint & Bone Health",
    gut:      "Gut Health",
    skin:     "Skin & Hair",
    focus:    "Focus & Brain",
    mood:     "Mood & Stress",
    heart:    "Heart Health",
    weight:   "Weight Management",
};

// Map goals → need-group slugs so we can pull real products from the existing API
const GOAL_TO_SLUG = {
    energy:   "essential-vits",
    sleep:    "brain-mood",
    immunity: "essential-vits",
    joints:   "bone-joint-mobility",
    gut:      "gut-digestive",
    skin:     "skin-hair-nails",
    focus:    "brain-mood",
    mood:     "brain-mood",
    heart:    "heart-circulation",
    weight:   "sports-nutrition",
};

function ProfileSummaryChip({ label }) {
    return (
        <span className="bg-green-50 border border-green-200 text-green-800 text-xs font-medium px-3 py-1 rounded-full">
            {label}
        </span>
    );
}

function ProductCard({ product }) {
    return (
        <Link
            to={`/products/${product.slug}`}
            className="flex gap-4 p-4 bg-white border border-green-100 rounded-xl shadow-sm hover:shadow-md transition"
        >
            {product.image && (
                <img
                    src={`/images/products/${product.image}`}
                    alt={product.name}
                    className="w-16 h-16 object-contain rounded-lg bg-green-50 flex-shrink-0"
                    onError={(e) => { e.target.style.display = "none"; }}
                />
            )}
            <div className="min-w-0">
                <p className="font-semibold text-green-900 text-sm leading-tight">{product.name}</p>
                {product.description && (
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{product.description}</p>
                )}
            </div>
        </Link>
    );
}

export default function MySupplementsPage() {
    const { user, loading } = useAuth();
    const navigate = useNavigate();
    const [sections, setSections] = useState([]);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        if (loading) return;
        if (!user) { navigate("/login"); return; }
        if (!user.profile?.onboarding_completed_at) { navigate("/my-supplements/onboarding"); return; }

        const goals = user.profile.goals ?? [];

        const slugs = [...new Set(goals.map((g) => GOAL_TO_SLUG[g]).filter(Boolean))];

        if (slugs.length === 0) { setFetching(false); return; }

        Promise.all(
            slugs.map((slug) =>
                fetch(`/api/need-groups/${slug}`, { credentials: "include" })
                    .then((r) => (r.ok ? r.json() : null))
                    .catch(() => null)
            )
        ).then((results) => {
            const built = results
                .filter(Boolean)
                .map((data) => ({
                    group:    data.group,
                    products: data.products ?? [],
                }))
                .filter((s) => s.products.length > 0);
            setSections(built);
            setFetching(false);
        });
    }, [user, loading, navigate]);

    if (loading || fetching) {
        return (
            <div className="min-h-screen bg-green-100 flex flex-col">
                <NavBar />
                <main className="flex-1 flex items-center justify-center">
                    <p className="text-green-700 font-medium animate-pulse">Building your plan…</p>
                </main>
            </div>
        );
    }

    const profile = user?.profile;

    return (
        <div className="min-h-screen bg-green-100 flex flex-col">
            <NavBar />

            <main className="flex-1 w-full bg-white rounded-t-3xl mt-6 py-12">
                <div className="max-w-4xl mx-auto px-4">

                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-green-900">
                            Your Daily Supplement Plan
                        </h1>
                        <p className="text-gray-500 mt-1">
                            Personalised for {user?.name} based on your health profile.
                        </p>

                        {/* Profile summary chips */}
                        <div className="flex flex-wrap gap-2 mt-4">
                            {profile?.age_range && <ProfileSummaryChip label={`Age: ${profile.age_range}`} />}
                            {profile?.sex && <ProfileSummaryChip label={profile.sex.replace("_", " ")} />}
                            {profile?.diet_type && <ProfileSummaryChip label={profile.diet_type.charAt(0).toUpperCase() + profile.diet_type.slice(1)} />}
                            {profile?.exercise_frequency && <ProfileSummaryChip label={`Exercise: ${profile.exercise_frequency}`} />}
                            {profile?.stress_level && <ProfileSummaryChip label={`Stress: ${profile.stress_level}`} />}
                        </div>

                        <Link
                            to="/my-supplements/onboarding"
                            className="inline-block mt-3 text-xs text-green-600 hover:underline font-medium"
                        >
                            Update my profile →
                        </Link>
                    </div>

                    {/* Sections per goal */}
                    {sections.length === 0 ? (
                        <div className="text-center py-20 text-gray-400">
                            <p>No matching products found for your goals yet.</p>
                            <Link to="/my-supplements/onboarding" className="mt-3 inline-block text-green-600 font-semibold hover:underline">
                                Update your preferences
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-10">
                            {sections.map((section) => (
                                <div key={section.group?.slug ?? section.group?.id}>
                                    <div className="mb-3">
                                        <h2 className="text-lg font-bold text-green-900">
                                            {section.group?.name}
                                        </h2>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {section.products.map((p) => (
                                            <ProductCard key={p.id} product={p} />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
