import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import NavBar from "../components/NavBar.jsx";
import { fetchNeedGroup } from "../api.js";

export default function NeedGroupPage() {
    const { slug } = useParams();
    const [group, setGroup] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        fetchNeedGroup(slug)
            .then(setGroup)
            .catch(() => setError("Category not found."))
            .finally(() => setLoading(false));
    }, [slug]);

    return (
        <div className="min-h-screen w-full bg-green-100 flex flex-col">
            <NavBar />

            <main className="flex-1 w-full bg-white rounded-t-3xl mt-6 py-12">
                <div className="max-w-4xl mx-auto px-4">

                    {loading && (
                        <div className="animate-pulse space-y-4">
                            <div className="h-8 bg-green-50 rounded w-1/3" />
                            <div className="h-4 bg-green-50 rounded w-2/3" />
                        </div>
                    )}

                    {error && (
                        <div className="text-center py-20">
                            <p className="text-red-500 mb-4">{error}</p>
                            <Link to="/" className="text-green-700 underline">Back to home</Link>
                        </div>
                    )}

                    {group && (
                        <>
                            <Link to="/" className="text-sm text-green-600 hover:underline">← Back</Link>

                            <h1 className="mt-4 text-3xl font-extrabold text-green-900">{group.name}</h1>
                            <p className="mt-2 text-green-700">Browse health needs in this category:</p>

                            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {group.conditions?.map((cond) => (
                                    <Link
                                        key={cond.slug}
                                        to={`/conditions/${cond.slug}`}
                                        className="block bg-green-50 hover:bg-green-100 rounded-xl px-5 py-4 text-green-900 font-medium transition"
                                    >
                                        {cond.name}
                                    </Link>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </main>
        </div>
    );
}
