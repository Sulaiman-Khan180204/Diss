import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar.jsx";
import { useAuth, getCsrfHeaders } from "../AuthContext.jsx";

export default function RegisterPage() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: "", password: "", password_confirmation: "" });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handle = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

    const submit = async (e) => {
        e.preventDefault();
        setErrors({});
        setLoading(true);
        try {
            await fetch("/sanctum/csrf-cookie", { credentials: "include" });

            const res = await fetch("/api/auth/register", {
                method: "POST",
                credentials: "include",
                headers: getCsrfHeaders(),
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (!res.ok) {
                setErrors(data.errors ?? { general: [data.message ?? "Registration failed."] });
                return;
            }
            login(data.user);
            navigate("/my-supplements/onboarding");
        } catch {
            setErrors({ general: ["Network error. Please try again."] });
        } finally {
            setLoading(false);
        }
    };

    const field = (label, name, type = "text", placeholder = "") => (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <input
                type={type}
                name={name}
                value={form[name]}
                onChange={handle}
                required
                placeholder={placeholder}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name][0]}</p>}
        </div>
    );

    return (
        <div className="min-h-screen bg-green-100 flex flex-col">
            <NavBar />
            <main className="flex-1 flex items-center justify-center px-4 py-16">
                <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8">
                    <h1 className="text-2xl font-bold text-green-900 mb-1">Create your account</h1>
                    <p className="text-sm text-gray-500 mb-6">Sign up to get a personalised daily supplement plan.</p>

                    {errors.general && (
                        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
                            {errors.general[0]}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-4">
                        {field("Username", "name", "text", "Choose a username")}
                        {field("Password", "password", "password", "Min. 8 characters")}
                        {field("Confirm password", "password_confirmation", "password", "Repeat password")}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-lg transition disabled:opacity-50"
                        >
                            {loading ? "Creating account…" : "Create account"}
                        </button>
                    </form>

                    <p className="mt-6 text-sm text-center text-gray-500">
                        Already have an account?{" "}
                        <Link to="/login" className="text-green-600 font-semibold hover:underline">
                            Log in
                        </Link>
                    </p>
                </div>
            </main>
        </div>
    );
}
