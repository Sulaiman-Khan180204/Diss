/**
 * Semantic Search — Web Worker
 * Runs the embedding pipeline in a background thread so the main UI never blocks.
 * Handles two message types:
 *   { type: 'BUILD' }                        — load model, fetch catalogue, embed all items
 *   { type: 'SEARCH', id, payload: {query} } — embed query, return ranked results
 */

let pipe = null;
let catalogue = null;

function cosineSim(a, b) {
    let dot = 0, na = 0, nb = 0;
    for (let i = 0; i < a.length; i++) {
        dot += a[i] * b[i];
        na  += a[i] * a[i];
        nb  += b[i] * b[i];
    }
    return dot / (Math.sqrt(na) * Math.sqrt(nb) + 1e-10);
}

async function getPipeline() {
    if (!pipe) {
        const { pipeline } = await import('https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.2/dist/transformers.min.js');
        pipe = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2', { quantized: true });
    }
    return pipe;
}

async function embed(p, text) {
    const output = await p(text, { pooling: 'mean', normalize: true });
    return Array.from(output.data);
}

self.onmessage = async ({ data }) => {
    const { type, id, payload } = data;

    try {
        if (type === 'BUILD') {
            self.postMessage({ type: 'PROGRESS', event: 'loading' });

            const p = await getPipeline();
            self.postMessage({ type: 'PROGRESS', event: 'model_ready' });

            const [pRes, cRes] = await Promise.all([
                fetch('/api/products'),
                fetch('/api/compounds'),
            ]);
            const [products, compounds] = await Promise.all([pRes.json(), cRes.json()]);

            const items = [];
            for (const prod of products) {
                items.push({
                    type:        'product',
                    name:        prod.name,
                    slug:        prod.slug,
                    description: prod.description || '',
                    form:        prod.form || '',
                    image_url:   prod.image_url || '',
                    text:        [prod.name, prod.form, prod.description].filter(Boolean).join('. '),
                });
            }
            for (const c of compounds) {
                items.push({
                    type:        'compound',
                    name:        c.name,
                    slug:        c.slug,
                    description: c.description || '',
                    category:    c.category || '',
                    text:        [c.name, c.category, c.description].filter(Boolean).join('. '),
                });
            }

            self.postMessage({ type: 'PROGRESS', event: 'indexing', total: items.length });

            const embeddings = [];
            for (const item of items) {
                embeddings.push(await embed(p, item.text));
            }

            catalogue = { items, embeddings };
            self.postMessage({ type: 'PROGRESS', event: 'ready' });
        }

        if (type === 'SEARCH') {
            if (!catalogue || !pipe) {
                self.postMessage({ type: 'SEARCH_ERROR', id, message: 'not_ready' });
                return;
            }

            const qVec = await embed(pipe, payload.query);

            const scored = catalogue.items.map((item, i) => ({
                ...item,
                score: cosineSim(qVec, catalogue.embeddings[i]),
            }));
            scored.sort((a, b) => b.score - a.score);
            const top = scored.filter(r => r.score >= 0.15).slice(0, 10);

            self.postMessage({
                type: 'SEARCH_RESULT',
                id,
                results: {
                    products:  top.filter(r => r.type === 'product').slice(0, 5),
                    compounds: top.filter(r => r.type === 'compound').slice(0, 4),
                },
            });
        }
    } catch (err) {
        self.postMessage({ type: 'ERROR', message: err?.message ?? String(err) });
    }
};
