import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
    return (
        <Link
            to={`/products/${product.slug}`}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden flex flex-col"
        >
            {product.image_url && (
                <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-40 object-contain bg-green-50 p-4"
                />
            )}
            <div className="p-4 flex flex-col flex-1">
                <h3 className="font-semibold text-green-900 text-base leading-snug">{product.name}</h3>
                {product.form && (
                    <span className="mt-1 text-xs text-green-600 capitalize">{product.form}</span>
                )}
                {product.description && (
                    <p className="mt-2 text-sm text-gray-600 line-clamp-3 flex-1">{product.description}</p>
                )}
            </div>
        </Link>
    );
}
