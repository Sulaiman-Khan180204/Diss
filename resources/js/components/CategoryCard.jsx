import { Link } from "react-router-dom";

// items: array of { name, slug } objects or plain strings
export default function CategoryCard({ title, items = [] }) {
    return (
        <div className="bg-white shadow-md p-5 rounded-xl w-full max-w-md">
            <h3 className="font-semibold text-lg text-green-900 mb-2">{title}</h3>
            <ul className="text-sm text-green-800 space-y-1">
                {items.map((item, idx) => {
                    if (typeof item === "string") {
                        return <li key={idx}>• {item}</li>;
                    }
                    return (
                        <li key={item.slug ?? idx}>
                            <Link
                                to={`/conditions/${item.slug}`}
                                className="hover:text-green-600 hover:underline"
                            >
                                • {item.name}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
