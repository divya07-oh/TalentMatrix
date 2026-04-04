import { NavLink } from "react-router-dom";

export default function Sidebar({ role }) {
  const studentMenu = [
    { name: "Dashboard", path: "/student" },
    { name: "Smart Search", path: "/search" },
    { name: "Collaboration", path: "/collaboration" },
    { name: "Profile", path: "/profile" },
  ];

  const facultyMenu = [
    { name: "Dashboard", path: "/faculty" },
    { name: "Post Requirement", path: "/post" },
    { name: "Collaboration", path: "/collaboration" },
    { name: "Smart Search", path: "/search" },
    { name: "Profile", path: "/profile" },
  ];

  const adminMenu = [
    { name: "Dashboard", path: "/admin" },
    { name: "Analytics", path: "/analytics" },
    { name: "Smart Search", path: "/search" },
    { name: "Collaboration", path: "/collaboration" },
    { name: "Profile", path: "/profile" },
  ];

  const menu =
    role === "student"
      ? studentMenu
      : role === "faculty"
      ? facultyMenu
      : adminMenu;

  return (
    <div className="w-64 bg-primary min-h-screen text-white p-6">
      <h2 className="text-lg font-semibold mb-8">
        TalentMatrix EDU
      </h2>

      {menu.map((item, index) => (
        <NavLink
          key={index}
          to={item.path}
          className={({ isActive }) =>
            `block px-4 py-3 rounded-xl mb-2 transition ${
              isActive
                ? "bg-secondary border-l-4 border-accent"
                : "hover:bg-secondary"
            }`
          }
        >
          {item.name}
        </NavLink>
      ))}
    </div>
  );
}
