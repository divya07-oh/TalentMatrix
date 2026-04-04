import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-primary shadow-md z-50">
      <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">

        {/* Logo */}
        <h1 className="text-xl font-semibold text-white">
          TalentMatrix EDU
        </h1>

        {/* Center Links */}
        <div className="hidden md:flex gap-8 text-white">
          <a href="#" className="hover:text-accent transition">
            Features
          </a>
          <a href="#" className="hover:text-accent transition">
            About
          </a>
          <a href="#" className="hover:text-accent transition">
            How It Works
          </a>
        </div>

        {/* Right Buttons */}
        <div className="flex gap-4">
          <Link
            to="/login"
            className="border border-white text-white px-4 py-2 rounded-xl hover:bg-white hover:text-primary transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="bg-accent text-white px-4 py-2 rounded-xl hover:opacity-90 transition"
          >
            Register
          </Link>
        </div>

      </div>
    </nav>
  );
}
