import Navbar from "../components/Navbar";

export default function Landing() {
  return (
    <div>
      <Navbar />

      <section className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-12 rounded-xl shadow-card text-center max-w-xl">
          <h1 className="text-4xl font-bold text-primary">
            TalentMatrix EDU
          </h1>
          <p className="mt-4 text-gray-600">
            University Talent Intelligence Platform
          </p>
          <button className="mt-6 px-6 py-3 bg-accent text-white rounded-xl hover:opacity-90 transition">
            Get Started
          </button>
        </div>
      </section>
    </div>
  );
}