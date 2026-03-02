import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function AppLayout({ role, title, children }) {
  return (
    <div className="flex bg-lightbg min-h-screen">
      <Sidebar role={role} />

      <div className="flex-1 flex flex-col">
        <Topbar title={title} />

        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}