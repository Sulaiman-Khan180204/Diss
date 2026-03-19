
// resources/js/pages/Home.jsx
import { useState } from "react";
import NavBar from "../components/NavBar.jsx";
import CategoryCard from "../components/CategoryCard.jsx";

export default function Home() {
  const [query, setQuery] = useState("");

  const categories = [
    {
      title: "Maintain and Improve Overall Health",
      items: ["Immune Support", "Heart & Circulation", "Daily Wellness"],
    },
    {
      title: "Address Nutritional Deficiencies",
      items: ["Low Iron / Low Energy", "Vitamin D Support", "Omega-3 Deficiency"],
    },
    {
      title: "Manage Specific Health Conditions",
      items: ["Stress & Relaxation", "Sleep Quality", "Digestive Comfort"],
    },
    {
      title: "Enhance Physical or Athletic Performance",
      items: ["Muscle Recovery", "Strength & Power", "Hydration"],
    },
    // Uncomment to add the fifth card:
    // {
    //   title: "Childcare",
    //   items: ["Pregnancy / Prenatal Support", "Postnatal Recovery", "Child-Friendly"],
    // },
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Searching:", query);
  };

  return (
    <div className="min-h-screen w-full bg-green-100 flex flex-col items-center">
      {/* Top nav bar with logo + links */}
      <NavBar />

      {/* HERO / TOP SECTION */}
      <section className="w-full bg-green-100 py-6">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mt-10 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-green-900 leading-tight">
              Find the Right Supplement<br className="hidden sm:block" />for Your Wellbeing
            </h1>

            <p className="text-green-700 mt-4 text-base sm:text-lg">
              Describe how you’re feeling today…
            </p>

            {/* Search bar */}
            <form
              onSubmit={handleSearchSubmit}
              className="mt-6 mx-auto max-w-xl flex items-center bg-white shadow-md rounded-full px-4 py-3"
              aria-label="Wellbeing search form"
            >
              <label htmlFor="search" className="sr-only">
                Describe how you’re feeling
              </label>
              <input
                id="search"
                type="text"
                placeholder="Search for"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 outline-none text-green-900 placeholder:opacity-70"
                autoComplete="off"
              />
              <button
                type="submit"
                className="ml-3 inline-flex items-center justify-center w-9 h-9 rounded-full bg-green-600 hover:bg-green-700 text-white transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600"
                aria-label="Search"
              >
                {/* search icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* BOTTOM WHITE SECTION */}
      <section className="w-full bg-white py-12 rounded-t-3xl mt-6">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-semibold text-green-900 text-center mb-10">
            Find what’s right for you
          </h2>

          {/* Categories */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 place-items-stretch">
            {categories.map((cat, idx) => (
              <CategoryCard key={idx} title={cat.title} items={cat.items} />
            ))}
          </div>

          {/* Safety disclaimer */}
          <p className="mt-10 text-xs text-green-700 text-center max-w-3xl mx-auto">
            This is general wellbeing information and not medical advice. If symptoms persist or you’re taking
            medication, please consult a healthcare professional.
          </p>
        </div>
      </section>
    </div>
  );
}
