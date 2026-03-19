// resources/js/components/NavBar.jsx
import Logo from "./Logo.jsx";

export default function NavBar() {
  return (
    <nav className="w-full bg-green-100 border-b border-green-200/70">
      <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between">

        {/* Left: brand/logo */}
        <div className="flex items-center">
          <Logo />
        </div>

        {/* Right: navigation */}
        <ul className="flex items-center gap-6 text-green-900 font-medium">

          {/* Products */}
          <li>
            <a href="#" className="flex items-center gap-1.5 hover:text-green-700">
              Products
              <svg
                className="w-3 h-3 stroke-current"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M5 7l5 6 5-6"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </li>

          {/* Products by Need */}
          <li>
            <a href="#" className="flex items-center gap-1.5 hover:text-green-700">
              Products by Need
              <svg
                className="w-3 h-3 stroke-current"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M5 7l5 6 5-6"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </li>

          {/* Children */}
          <li>
            <a href="#" className="flex items-center gap-1.5 hover:text-green-700">
              Children
              <svg
                className="w-3 h-3 stroke-current"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M5 7l5 6 5-6"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </li>

          {/* About (NO ARROW) */}
          <li>
            <a href="#" className="hover:text-green-700">
              About
            </a>
          </li>

        </ul>
      </div>
    </nav>
  );
}