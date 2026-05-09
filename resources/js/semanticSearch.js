/**
 * Semantic Search — worker-backed façade.
 * Same public API as before; all heavy work (model load + ONNX inference) runs
 * in a Web Worker so the main thread — and therefore the UI — is never blocked.
 */

let worker      = null;
let isIndexed   = false;
let searchIdSeq = 0;
const pending   = new Map(); // id → { resolve, reject }

// Callbacks set by buildCatalogue
let onBuildProgress = null;
let buildResolve    = null;
let buildReject     = null;

function getWorker() {
    if (worker) return worker;

    worker = new Worker(new URL('./searchWorker.js', import.meta.url), { type: 'module' });

    worker.onmessage = ({ data }) => {
        switch (data.type) {

            case 'PROGRESS':
                if (data.event === 'ready') {
                    isIndexed = true;
                    buildResolve?.();
                }
                onBuildProgress?.(data.event, data);
                break;

            case 'SEARCH_RESULT': {
                const p = pending.get(data.id);
                if (p) { pending.delete(data.id); p.resolve(data.results); }
                break;
            }

            case 'SEARCH_ERROR': {
                const p = pending.get(data.id);
                if (p) { pending.delete(data.id); p.reject(new Error(data.message)); }
                break;
            }

            case 'ERROR':
                buildReject?.(new Error(data.message));
                for (const p of pending.values()) p.reject(new Error(data.message));
                pending.clear();
                break;
        }
    };

    worker.onerror = (e) => {
        buildReject?.(new Error(e.message ?? 'Worker error'));
    };

    return worker;
}

/** Load model and embed the full catalogue. Resolves when ready. */
export function buildCatalogue(onProgress) {
    onBuildProgress = onProgress;

    if (isIndexed) {
        onProgress?.('ready');
        return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
        buildResolve = resolve;
        buildReject  = reject;
        getWorker().postMessage({ type: 'BUILD' });
    });
}

/** True once the catalogue is fully indexed. */
export function isReady() {
    return isIndexed;
}

/** Run a semantic search. Returns { products, compounds }. */
export function semanticSearch(query, opts = {}) {
    if (!isIndexed) return Promise.reject(new Error('Catalogue not ready'));

    const id = ++searchIdSeq;
    return new Promise((resolve, reject) => {
        pending.set(id, { resolve, reject });
        getWorker().postMessage({ type: 'SEARCH', id, payload: { query, ...opts } });
    });
}
