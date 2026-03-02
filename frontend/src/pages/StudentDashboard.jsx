import AppLayout from "../layouts/AppLayout";

export default function StudentDashboard() {
  return (
    <AppLayout role="student" title="Student Dashboard">
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-card">
          <h2 className="font-semibold">Active Projects</h2>
          <p className="text-3xl mt-4 text-primary">12</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-card">
          <h2 className="font-semibold">Collaborations</h2>
          <p className="text-3xl mt-4 text-primary">5</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-card">
          <h2 className="font-semibold">Mentors</h2>
          <p className="text-3xl mt-4 text-primary">3</p>
        </div>
      </div>
    </AppLayout>
  );
}