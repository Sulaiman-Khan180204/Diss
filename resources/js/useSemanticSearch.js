import { useState, useEffect, useCallback, useRef } from 'react';
import { buildCatalogue, semanticSearch, isReady } from './semanticSearch.js';

/**
 * React hook that wraps the semantic search engine.
 *
 * Returns:
 *   status   — 'loading' | 'model_ready' | 'indexing' | 'ready' | 'error'
 *   results  — { products, compounds } | null
 *   searching — true while a query is being processed
 *   search(query) — call this on every keystroke (debounced internally)
 */
export default function useSemanticSearch() {
    const [status, setStatus]     = useState('loading');
    const [error, setError]       = useState(null);
    const [results, setResults]   = useState(null);
    const [searching, setSearching] = useState(false);
    const timerRef = useRef(null);

    // Kick off model + catalogue build as soon as the hook mounts
    useEffect(() => {
        let alive = true;
        buildCatalogue((event) => {
            if (!alive) return;
            if (event === 'model_ready') setStatus('indexing');
            if (event === 'ready')       setStatus('ready');
        }).catch((err) => {
            console.error('[SemanticSearch] Failed to build catalogue:', err);
            if (alive) {
                setStatus('error');
                setError(err?.message ?? String(err));
            }
        });
        return () => { alive = false; };
    }, []);

    const search = useCallback((query) => {
        if (timerRef.current) clearTimeout(timerRef.current);

        if (!query.trim()) {
            setResults(null);
            return;
        }

        if (!isReady()) return;

        // 300 ms debounce
        timerRef.current = setTimeout(async () => {
            setSearching(true);
            try {
                const r = await semanticSearch(query);
                setResults(r);
            } catch {
                setResults(null);
            } finally {
                setSearching(false);
            }
        }, 300);
    }, []);

    return { status, error, results, searching, search };
}
