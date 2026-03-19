
export default function CategoryCard({ title, items = [] }) {
  return (
    <div className="bg-white shadow-md p-5 rounded-xl w-full max-w-md">
      <h3 className="font-semibold text-lg text-green-900 mb-2">{title}</h3>
      <ul className="text-sm text-green-800 space-y-1">
        {items.map((i, idx) => (
          <li key={idx}>• {i}</li>
        ))}
      </ul>
    </div>
  );
}
