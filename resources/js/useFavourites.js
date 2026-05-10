import { useState, useEffect, useCallback } from "react";
import { fetchFavouriteSlugs, toggleFavourite } from "./api.js";
import { useAuth } from "./AuthContext.jsx";

export default function useFavourites() {
    const { user } = useAuth();
    const [favourites, setFavourites] = useState(new Set());
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!user) { setFavourites(new Set()); return; }
        setLoading(true);
        fetchFavouriteSlugs()
            .then((data) => setFavourites(new Set(data.slugs ?? [])))
            .catch(() => {})
            .finally(() => setLoading(false));
    }, [user]);

    const toggle = useCallback(async (slug) => {
        if (!user) return;
        const wasFav = favourites.has(slug);
        setFavourites((prev) => {
            const next = new Set(prev);
            wasFav ? next.delete(slug) : next.add(slug);
            return next;
        });
        try {
            await toggleFavourite(slug);
        } catch {
            setFavourites((prev) => {
                const next = new Set(prev);
                wasFav ? next.add(slug) : next.delete(slug);
                return next;
            });
        }
    }, [user, favourites]);

    return { favourites, toggle, loading };
}
