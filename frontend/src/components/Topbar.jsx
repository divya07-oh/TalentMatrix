export default function Topbar({ title }) {
  return (
    <div className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold text-primary">
        {title}
      </h1>

      <div className="flex items-center gap-4">
        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
      </div>
    </div>
  );
}