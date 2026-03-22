const BASE = '/api';

async function get(path) {
    const res = await fetch(BASE + path);
    if (!res.ok) throw new Error(`API error ${res.status}: ${path}`);
    return res.json();
}

export const fetchNeedGroups = () => get('/need-groups');

export const fetchNeedGroup = (slug) => get(`/need-groups/${slug}`);

export const fetchProducts = () => get('/products');

export const fetchSearch = (q) => get(`/search?q=${encodeURIComponent(q)}`);

export const fetchProduct = (slug) => get(`/products/${slug}`);

export const fetchCondition = (slug) => get(`/conditions/${slug}`);
