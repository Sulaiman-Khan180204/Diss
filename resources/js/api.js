const BASE = '/api';

async function get(path) {
    const res = await fetch(BASE + path, { credentials: 'include' });
    if (!res.ok) throw new Error(`API error ${res.status}: ${path}`);
    return res.json();
}

async function post(path) {
    const token = document.cookie
        .split('; ')
        .find((r) => r.startsWith('XSRF-TOKEN='))
        ?.split('=')[1];
    const res = await fetch(BASE + path, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': token ? decodeURIComponent(token) : '',
        },
    });
    if (!res.ok) throw new Error(`API error ${res.status}: ${path}`);
    return res.json();
}

export const fetchNeedGroups = () => get('/need-groups');

export const fetchNeedGroup = (slug) => get(`/need-groups/${slug}`);

export const fetchProducts = () => get('/products');

export const fetchSearch = (q) => get(`/search?q=${encodeURIComponent(q)}`);

export const fetchProduct = (slug) => get(`/products/${slug}`);

export const fetchCondition = (slug) => get(`/conditions/${slug}`);

export const fetchCompounds = () => get('/compounds');

export const fetchCompound = (slug) => get(`/compounds/${slug}`);

export const fetchFavouriteSlugs    = () => get('/favourites');
export const fetchFavouriteProducts = () => get('/favourites/products');
export const toggleFavourite        = (slug) => post(`/favourites/${slug}`);
