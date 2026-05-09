import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar.jsx";
import { useAuth, getCsrfHeaders } from "../AuthContext.jsx";

export default function LoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ username: "", password: "", remember: false });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handle = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

    const submit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            // Fetch CSRF cookie first (Sanctum SPA requirement)
            await fetch("/sanctum/csrf-cookie", { credentials: "include" });

            const res = await fetch("/api/auth/login", {
                method: "POST",
                credentials: "include",
                headers: getCsrfHeaders(),
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (!res.ok) {
                setError("Credentials Incorrect. Please try again.");
                return;
            }
            login(data.user);
            // If no onboarding done yet, go to quiz — otherwise go home
            if (!data.user.profile?.onboarding_completed_at) {
                navigate("/my-supplements/onboarding");
            } else {
                navigate("/my-supplements");
            }
        } catch {
            setError("Credentials Incorrect. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-green-100 flex flex-col">
            <NavBar />
            <main className="flex-1 flex items-center justify-center px-4 py-16">
                <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8">
                    <h1 className="text-2xl font-bold text-green-900 mb-1">Welcome back</h1>
                    <p className="text-sm text-gray-500 mb-6">Log in to see your personalised supplement plan.</p>

                    {error && (
                        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
                            {error}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                            <input
                                type="text"
                                name="username"
                                value={form.username}
                                onChange={handle}
                                required
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                                placeholder="Enter your username"
                                autoComplete="username"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handle}
                                required
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                                placeholder="••••••••"
                            />
                        </div>

                        <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                            <input
                                type="checkbox"
                                name="remember"
                                checked={form.remember}
                                onChange={handle}
                                className="accent-green-600"
                            />
                            Remember me
                        </label>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-lg transition disabled:opacity-50"
                        >
                            {loading ? "Logging in…" : "Log in"}
                        </button>
                    </form>

                    <p className="mt-6 text-sm text-center text-gray-500">
                        Don't have an account?{" "}
                        <Link to="/register" className="text-green-600 font-semibold hover:underline">
                            Sign up
                        </Link>
                    </p>
                </div>
            </main>
        </div>
    );
}
