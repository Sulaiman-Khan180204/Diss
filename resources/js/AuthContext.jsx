import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(undefined); // undefined = still loading

    useEffect(() => {
        fetch("/api/auth/me", { credentials: "include" })
            .then((r) => (r.ok ? r.json() : null))
            .then((data) => setUser(data?.user ?? null))
            .catch(() => setUser(null));
    }, []);

    const login = (userData) => setUser(userData);
    const logout = () => {
        fetch("/api/auth/logout", {
            method: "POST",
            credentials: "include",
            headers: getCsrfHeaders(),
        }).finally(() => setUser(null));
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading: user === undefined }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}

export function getCsrfHeaders() {
    const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("XSRF-TOKEN="))
        ?.split("=")[1];
    return {
        "Content-Type": "application/json",
        "X-XSRF-TOKEN": token ? decodeURIComponent(token) : "",
    };
}
