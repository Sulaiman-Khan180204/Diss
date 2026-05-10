import { useState } from "react";
import { flushSync } from "react-dom";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar.jsx";
import { useAuth, getCsrfHeaders } from "../AuthContext.jsx";

const GOALS = [
    { id: "energy",    label: "Energy & Fatigue" },
    { id: "sleep",     label: "Sleep Quality" },
    { id: "immunity",  label: "Immune Support" },
    { id: "joints",    label: "Joint & Bone Health" },
    { id: "gut",       label: "Gut Health" },
    { id: "skin",      label: "Skin & Hair" },
    { id: "focus",     label: "Focus & Brain" },
    { id: "mood",      label: "Mood & Stress" },
    { id: "heart",     label: "Heart Health" },
    { id: "weight",    label: "Weight Management" },
];

const STEPS = ["goals", "basics", "diet", "lifestyle"];

function ProgressBar({ step }) {
    const pct = Math.round(((step + 1) / STEPS.length) * 100);
    return (
        <div className="w-full bg-green-100 rounded-full h-2 mb-8">
            <div
                className="bg-green-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${pct}%` }}
            />
        </div>
    );
}

function ChipSelect({ options, selected, onToggle, max = Infinity }) {
    return (
        <div className="flex flex-wrap gap-2">
            {options.map((opt) => {
                const active = selected.includes(opt.id);
                const disabled = !active && selected.length >= max;
                return (
                    <button
                        key={opt.id}
                        type="button"
                        disabled={disabled}
                        onClick={() => onToggle(opt.id)}
                        className={`px-4 py-2 rounded-full text-sm font-medium border transition
                            ${active
                                ? "bg-green-600 text-white border-green-600"
                                : disabled
                                    ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                                    : "bg-white text-green-800 border-green-200 hover:border-green-500"
                            }`}
                    >
                        {opt.label}
                    </button>
                );
            })}
        </div>
    );
}

function RadioGroup({ options, value, onChange }) {
    return (
        <div className="grid grid-cols-2 gap-3">
            {options.map((opt) => (
                <button
                    key={opt.id}
                    type="button"
                    onClick={() => onChange(opt.id)}
                    className={`px-4 py-3 rounded-xl text-sm font-medium border text-left transition
                        ${value === opt.id
                            ? "bg-green-600 text-white border-green-600"
                            : "bg-white text-green-800 border-green-200 hover:border-green-500"
                        }`}
                >
                    {opt.label}
                </button>
            ))}
        </div>
    );
}

function DisclaimerModal({ onAccept }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
                <h2 className="text-xl font-bold text-green-900 mb-1">Before you begin</h2>
                <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-4">Privacy & Health Disclaimer</p>

                <div className="space-y-3 text-sm text-gray-600 mb-6">
                    <p>
                        This quiz collects personal health information — including your age, sex, diet, and health goals — to generate a personalised supplement suggestion list.
                    </p>
                    <p>
                        Under the <span className="font-medium text-gray-800">UK GDPR and Data Protection Act 2018</span>, health-related data is classified as special category data. By proceeding, you give your explicit consent for this information to be stored and used solely to personalise your recommendations on WhatSupp?.
                    </p>
                    <p>
                        <span className="font-medium text-gray-800">Important:</span> The suggestions provided are <span className="font-medium text-gray-800">not medical advice</span>. They are based on general nutritional information only. Always consult a qualified GP or healthcare professional before starting any supplement, especially if you have an existing medical condition, are pregnant, breastfeeding, or taking prescribed medication.
                    </p>
                    <p>
                        Some products on this platform carry MHRA Traditional Herbal Registration requirements. No claims are made that any supplement diagnoses, treats, or cures any condition.
                    </p>
                </div>

                <button
                    onClick={onAccept}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition"
                >
                    I understand — start the quiz
                </button>
                <p className="text-xs text-gray-400 text-center mt-3">You can withdraw your data at any time by contacting us.</p>
            </div>
        </div>
    );
}

export default function OnboardingPage() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [disclaimerAccepted, setDisclaimerAccepted] = useState(false);
    const [step, setStep] = useState(0);
    const [saving, setSaving] = useState(false);
    const [saveError, setSaveError] = useState(null);

    const [profile, setProfile] = useState({
        goals: [],
        age_range: "",
        sex: "",
        diet_type: "",
        stress_level: "",
        sun_exposure: "",
        exercise_frequency: "",
    });

    const set = (key, value) => setProfile((p) => ({ ...p, [key]: value }));
    const toggleGoal = (id) =>
        setProfile((p) => ({
            ...p,
            goals: p.goals.includes(id) ? p.goals.filter((g) => g !== id) : [...p.goals, id],
        }));

    const canNext = () => {
        if (step === 0) return profile.goals.length > 0;
        if (step === 1) return profile.age_range && profile.sex;
        if (step === 2) return profile.diet_type;
        if (step === 3) return profile.stress_level && profile.sun_exposure && profile.exercise_frequency;
        return true;
    };

    const save = async () => {
        setSaving(true);
        setSaveError(null);
        try {
            await fetch("/sanctum/csrf-cookie", { credentials: "include" });

            const res = await fetch("/api/profile", {
                method: "POST",
                credentials: "include",
                headers: getCsrfHeaders(),
                body: JSON.stringify(profile),
            });

            if (!res.ok) {
                setSaveError("Something went wrong. Please try again.");
                return;
            }

            // Re-fetch the user so MySupplementsPage sees the updated profile.
            // flushSync forces the state update to commit before navigate() fires,
            // avoiding a stale-user redirect back to onboarding.
            const meRes = await fetch("/api/auth/me", { credentials: "include" });
            if (meRes.ok) {
                const { user: freshUser } = await meRes.json();
                flushSync(() => login(freshUser));
            }

            navigate("/my-supplements");
        } catch {
            setSaveError("Network error. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="min-h-screen bg-green-100 flex flex-col">
            {!disclaimerAccepted && <DisclaimerModal onAccept={() => setDisclaimerAccepted(true)} />}
            <NavBar />
            <main className="flex-1 flex items-center justify-center px-4 py-12">
                <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-8">

                    <p className="text-xs text-green-600 font-semibold uppercase tracking-wide mb-1">
                        Step {step + 1} of {STEPS.length}
                    </p>

                    <ProgressBar step={step} />

                    {/* Step 0 — Goals */}
                    {step === 0 && (
                        <>
                            <h2 className="text-xl font-bold text-green-900 mb-1">What are your health goals?</h2>
                            <p className="text-sm text-gray-500 mb-5">Pick everything that applies — you can choose multiple.</p>
                            <ChipSelect options={GOALS} selected={profile.goals} onToggle={toggleGoal} />
                        </>
                    )}

                    {/* Step 1 — Basics */}
                    {step === 1 && (
                        <>
                            <h2 className="text-xl font-bold text-green-900 mb-1">A little about you</h2>
                            <p className="text-sm text-gray-500 mb-5">Age and sex affect which supplements are most relevant for you.</p>

                            <p className="text-sm font-medium text-gray-700 mb-2">Age range</p>
                            <RadioGroup
                                options={[
                                    { id: "under-18", label: "Under 18" },
                                    { id: "18-25",    label: "18–25" },
                                    { id: "26-35",    label: "26–35" },
                                    { id: "36-50",    label: "36–50" },
                                    { id: "50+",      label: "50+" },
                                ]}
                                value={profile.age_range}
                                onChange={(v) => set("age_range", v)}
                            />

                            <p className="text-sm font-medium text-gray-700 mt-5 mb-2">Biological sex</p>
                            <RadioGroup
                                options={[
                                    { id: "male",              label: "Male" },
                                    { id: "female",            label: "Female" },
                                    { id: "prefer_not_to_say", label: "Prefer not to say" },
                                ]}
                                value={profile.sex}
                                onChange={(v) => set("sex", v)}
                            />
                        </>
                    )}

                    {/* Step 2 — Diet */}
                    {step === 2 && (
                        <>
                            <h2 className="text-xl font-bold text-green-900 mb-1">What's your diet like?</h2>
                            <p className="text-sm text-gray-500 mb-5">Diet affects common nutritional gaps we can help fill.</p>
                            <RadioGroup
                                options={[
                                    { id: "omnivore",    label: "Omnivore (everything)" },
                                    { id: "vegetarian",  label: "Vegetarian" },
                                    { id: "vegan",       label: "Vegan" },
                                    { id: "pescatarian", label: "Pescatarian" },
                                    { id: "keto",        label: "Keto / Low-carb" },
                                    { id: "other",       label: "Other" },
                                ]}
                                value={profile.diet_type}
                                onChange={(v) => set("diet_type", v)}
                            />
                        </>
                    )}

                    {/* Step 3 — Lifestyle */}
                    {step === 3 && (
                        <>
                            <h2 className="text-xl font-bold text-green-900 mb-1">Your lifestyle</h2>
                            <p className="text-sm text-gray-500 mb-5">These factors influence your daily supplement needs.</p>

                            <p className="text-sm font-medium text-gray-700 mb-2">Typical stress level</p>
                            <RadioGroup
                                options={[
                                    { id: "low",      label: "Low" },
                                    { id: "moderate", label: "Moderate" },
                                    { id: "high",     label: "High" },
                                ]}
                                value={profile.stress_level}
                                onChange={(v) => set("stress_level", v)}
                            />

                            <p className="text-sm font-medium text-gray-700 mt-5 mb-2">Daily sun exposure</p>
                            <RadioGroup
                                options={[
                                    { id: "low",      label: "Low (mostly indoors)" },
                                    { id: "moderate", label: "Moderate" },
                                    { id: "high",     label: "High (lots of time outside)" },
                                ]}
                                value={profile.sun_exposure}
                                onChange={(v) => set("sun_exposure", v)}
                            />

                            <p className="text-sm font-medium text-gray-700 mt-5 mb-2">Exercise frequency</p>
                            <RadioGroup
                                options={[
                                    { id: "sedentary", label: "Sedentary (little exercise)" },
                                    { id: "light",     label: "Light (1–2×/week)" },
                                    { id: "moderate",  label: "Moderate (3–4×/week)" },
                                    { id: "active",    label: "Very active (5+×/week)" },
                                ]}
                                value={profile.exercise_frequency}
                                onChange={(v) => set("exercise_frequency", v)}
                            />
                        </>
                    )}

                    {/* Navigation */}
                    {saveError && (
                        <p className="text-red-500 text-sm mt-6 text-center">{saveError}</p>
                    )}
                    <div className="flex justify-between mt-4">
                        <button
                            type="button"
                            onClick={() => setStep((s) => s - 1)}
                            disabled={step === 0}
                            className="text-sm text-gray-500 hover:text-gray-700 disabled:invisible"
                        >
                            ← Back
                        </button>

                        {step < STEPS.length - 1 ? (
                            <button
                                type="button"
                                onClick={() => setStep((s) => s + 1)}
                                disabled={!canNext()}
                                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2.5 rounded-lg transition disabled:opacity-40"
                            >
                                Next →
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={save}
                                disabled={!canNext() || saving}
                                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2.5 rounded-lg transition disabled:opacity-40"
                            >
                                {saving ? "Saving…" : "See my plan →"}
                            </button>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
