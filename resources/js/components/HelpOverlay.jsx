import { useState, useEffect, useMemo } from "react";

const BASE_STEPS = [
    {
        id: "ai-search",
        title: "AI Search Bar",
        text: "Type how you're feeling and press Enter. The AI reads your description and recommends the most relevant supplements from our catalogue.",
    },
    {
        id: "nav-products-by-need",
        title: "Products by Need",
        text: "Browse supplements grouped by health goal — immunity, sleep, energy and more. Hover to open the menu and click any category to explore it.",
    },
    {
        id: "nav-body-map",
        title: "Body Map",
        text: "Click on a body part to find supplements that support that area. A visual, intuitive way to explore what might help you.",
    },
    {
        id: "nav-compound-explorer",
        title: "Compound Explorer",
        text: "Explore the active compounds inside supplements — like Vitamin D or Omega-3. See what each one does and which products contain it.",
    },
    {
        id: "nav-products",
        title: "All Products",
        text: "View every supplement in the catalogue in one place. Browse freely without needing a specific health goal in mind.",
    },
    {
        id: "nav-children",
        title: "Children",
        text: "A dedicated section for supplements suitable for children and infants, filtered to show only age-appropriate products.",
    },
    {
        id: "nav-auth",
        title: "Log In / My Plan",
        text: "Log in to take a short health quiz and build a personal supplement plan. Your recommendations are saved so you can revisit them anytime.",
    },
];

const LOGGED_IN_STEPS = [
    {
        id: "nav-auth",
        title: "My Plan",
        text: "Your personalised supplement plan based on your health quiz answers. Revisit it anytime to see your recommended products.",
    },
    {
        id: "nav-favourites",
        title: "Favourites",
        text: "Star any product to save it here. Your favourites are stored to your account so they're waiting for you every time you log back in.",
    },
];

const TIP_W = 280;

export default function HelpOverlay({ onClose, user }) {
    const [step, setStep] = useState(0);
    const [rect, setRect] = useState(null);

    const STEPS = useMemo(() => {
        if (user) {
            const withoutAuth = BASE_STEPS.filter((s) => s.id !== "nav-auth");
            return [...withoutAuth, ...LOGGED_IN_STEPS];
        }
        return BASE_STEPS;
    }, [user]);

    const current = STEPS[step];

    useEffect(() => {
        const el = document.querySelector(`[data-help-id="${current.id}"]`);
        setRect(el ? el.getBoundingClientRect() : null);
    }, [step, current.id]);

    useEffect(() => {
        const recalc = () => {
            const el = document.querySelector(`[data-help-id="${current.id}"]`);
            if (el) setRect(el.getBoundingClientRect());
        };
        window.addEventListener("resize", recalc);
        return () => window.removeEventListener("resize", recalc);
    }, [current.id]);

    // Position tooltip centred over the highlighted element
    let tipStyle = { width: TIP_W };
    let arrowLeft = TIP_W / 2 - 8;

    if (rect) {
        const cx = rect.left + rect.width / 2;
        const left = Math.max(8, Math.min(cx - TIP_W / 2, window.innerWidth - TIP_W - 8));
        arrowLeft = Math.max(12, Math.min(cx - left - 8, TIP_W - 28));
        tipStyle = { ...tipStyle, top: rect.bottom + 14, left };
    } else {
        tipStyle = { ...tipStyle, top: 80, left: "50%", transform: "translateX(-50%)" };
    }

    return (
        <>
            {/* Click-outside closes */}
            <div className="fixed inset-0 z-[60]" onClick={onClose} />

            {/* Spotlight + dim via box-shadow */}
            {rect && (
                <div
                    className="fixed pointer-events-none z-[61] rounded-md"
                    style={{
                        top: rect.top - 3,
                        left: rect.left - 3,
                        width: rect.width + 6,
                        height: rect.height + 6,
                        boxShadow: "0 0 0 9999px rgba(0,0,0,0.55), 0 0 0 3px #16a34a",
                    }}
                />
            )}

            {/* Tooltip card */}
            <div
                className="fixed z-[62] bg-white rounded-xl shadow-2xl p-4"
                style={tipStyle}
                onClick={e => e.stopPropagation()}
            >
                {/* Arrow pointing up toward element */}
                {rect && (
                    <div
                        className="absolute w-0 h-0"
                        style={{
                            top: -8,
                            left: arrowLeft,
                            borderLeft: "8px solid transparent",
                            borderRight: "8px solid transparent",
                            borderBottom: "8px solid white",
                        }}
                    />
                )}

                <div className="flex items-center justify-between mb-1.5">
                    <span className="font-semibold text-green-900 text-sm">{current.title}</span>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 ml-2 leading-none">✕</button>
                </div>

                <p className="text-xs text-gray-600 leading-relaxed">{current.text}</p>

                <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-100">
                    <span className="text-xs text-gray-400">{step + 1} of {STEPS.length}</span>
                    <div className="flex items-center gap-2">
                        {step > 0 && (
                            <button
                                onClick={() => setStep(s => s - 1)}
                                className="text-xs text-green-700 hover:text-green-900 font-medium"
                            >
                                ← Back
                            </button>
                        )}
                        {step < STEPS.length - 1 ? (
                            <button
                                onClick={() => setStep(s => s + 1)}
                                className="text-xs bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-full font-medium transition"
                            >
                                Next →
                            </button>
                        ) : (
                            <button
                                onClick={onClose}
                                className="text-xs bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-full font-medium transition"
                            >
                                Done ✓
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
