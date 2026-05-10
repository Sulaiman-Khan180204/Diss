import NavBar from "../components/NavBar.jsx";
import { Link } from "react-router-dom";

const SOURCES = [
    {
        label: "NHS — Vitamins and Minerals",
        href: "https://www.nhs.uk/conditions/vitamins-and-minerals/",
        desc: "NHS guidance on vitamins, minerals, and supplement safety for UK consumers.",
    },
    {
        label: "MHRA — Herbal Medicines Regulation",
        href: "https://www.gov.uk/guidance/herbal-medicines-regulation",
        desc: "Official UK guidance on Traditional Herbal Registration (THR) requirements.",
    },
    {
        label: "EFSA — Nutrition & Health Claims",
        href: "https://www.efsa.europa.eu/en/topics/topic/nutrition",
        desc: "European Food Safety Authority register of authorised nutrition and health claims, still referenced in UK post-Brexit.",
    },
    {
        label: "Food Standards Agency — Food Supplements",
        href: "https://www.food.gov.uk/business-guidance/food-supplements",
        desc: "FSA guidance on UK regulations governing the sale of food supplements.",
    },
    {
        label: "British Nutrition Foundation",
        href: "https://www.nutrition.org.uk",
        desc: "Evidence-based nutrition science and consumer guidance.",
    },
];

export default function AboutPage() {
    return (
        <div className="min-h-screen w-full bg-green-100 flex flex-col">
            <NavBar />

            <main className="flex-1 w-full bg-white rounded-t-3xl mt-6">
                <div className="max-w-3xl mx-auto px-6 py-14">

                    {/* Hero */}
                    <p className="text-xs font-bold text-green-600 uppercase tracking-widest mb-2">About WhatSupp?</p>
                    <h1 className="text-4xl font-extrabold text-green-900 leading-tight mb-4">
                        Helping you understand<br />what's actually in your supplements.
                    </h1>
                    <p className="text-lg text-gray-500 mb-12">
                        We don't tell you what to take — we help you understand what's out there.
                    </p>

                    <hr className="border-green-100 mb-12" />

                    {/* What is WhatSupp? */}
                    <Section title="What is WhatSupp?">
                        <p>
                            WhatSupp? is a UK-focused supplement catalogue and personalised recommendation tool built to help everyday consumers make more informed choices. The UK supplement market is worth over £500 million a year, yet most products are bought based on marketing language rather than clinical evidence. WhatSupp? cuts through that by presenting supplement information in plain English, grounded in NHS, EFSA, and MHRA guidance.
                        </p>
                        <p>
                            Every product page explains what a supplement is, what the evidence actually says, any relevant safety considerations, and the UK regulatory status — so you know exactly what you're reading and where it comes from.
                        </p>
                    </Section>

                    {/* How recommendations work */}
                    <Section title="How recommendations work">
                        <p>
                            The personalised My Plan feature asks you a short set of questions about your health goals, diet, and lifestyle. Your answers are matched against a curated database of need groups and conditions — for example, selecting <span className="font-medium text-green-800">Energy &amp; Fatigue</span> as a goal will surface supplements with a high evidence-based relevance score for that condition.
                        </p>
                        <p>
                            Recommendations are entirely rule-based: no black-box algorithms, no third-party profiling. The reason shown for each suggestion comes from the condition it was matched to, so you always know why something appeared in your plan.
                        </p>
                        <p className="text-sm text-gray-400 italic">
                            Recommendations are not medical advice. They reflect general nutritional information only — see the disclaimer below.
                        </p>
                    </Section>

                    {/* Regulatory context */}
                    <Section title="UK regulatory context">
                        <p>
                            All supplement information on WhatSupp? is written with reference to the following regulatory frameworks:
                        </p>
                        <ul className="list-disc list-inside space-y-1 text-gray-600">
                            <li><span className="font-medium text-gray-800">The Food Supplements (England) Regulations 2003</span> — governs what can legally be sold as a food supplement in the UK.</li>
                            <li><span className="font-medium text-gray-800">EFSA health claim authorisations</span> — the scientific basis for approved nutrition and health claims, referenced in UK labelling rules post-Brexit.</li>
                            <li><span className="font-medium text-gray-800">MHRA Traditional Herbal Registration (THR)</span> — required for certain herbal products (e.g. St John's Wort, Evening Primrose Oil) where medicinal claims are made.</li>
                            <li><span className="font-medium text-gray-800">NHS guidance</span> — used as the primary consumer-facing reference for safe upper limits and general supplement advice.</li>
                        </ul>
                    </Section>

                    {/* Disclaimer */}
                    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-12">
                        <p className="text-sm font-bold text-amber-800 uppercase tracking-wide mb-2">Health Disclaimer</p>
                        <p className="text-sm text-amber-700">
                            Nothing on WhatSupp? constitutes medical advice. The information provided is for general educational purposes only. Always consult a qualified GP or healthcare professional before starting any supplement, particularly if you have a pre-existing medical condition, are pregnant or breastfeeding, or are taking prescribed medication. Some supplements interact with medicines — do not rely solely on this platform to assess your suitability.
                        </p>
                    </div>

                    {/* Sources */}
                    <Section title="Sources & references">
                        <p>
                            Product descriptions and safety information on WhatSupp? draw from the following authoritative sources:
                        </p>
                        <div className="space-y-3 mt-4">
                            {SOURCES.map((s) => (
                                <div key={s.href} className="flex gap-3 items-start">
                                    <span className="mt-1 w-2 h-2 rounded-full bg-green-400 flex-shrink-0" />
                                    <div>
                                        <a
                                            href={s.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm font-medium text-green-700 hover:underline"
                                        >
                                            {s.label}
                                        </a>
                                        <p className="text-xs text-gray-500 mt-0.5">{s.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Section>

                    {/* CTA */}
                    <div className="mt-12 text-center">
                        <p className="text-gray-500 mb-4">Ready to explore?</p>
                        <Link
                            to="/products"
                            className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-xl transition"
                        >
                            Browse all products
                        </Link>
                    </div>

                    <hr className="border-green-100 mt-14 mb-6" />
                    <p className="text-center text-sm text-gray-400">Created by Sulaiman Khan</p>

                </div>
            </main>
        </div>
    );
}

function Section({ title, children }) {
    return (
        <div className="mb-10">
            <h2 className="text-xl font-bold text-green-900 mb-3">{title}</h2>
            <div className="space-y-3 text-gray-600 leading-relaxed">
                {children}
            </div>
        </div>
    );
}
