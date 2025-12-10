"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, RefreshCw, ClipboardList } from "lucide-react";

type Booking = {
  _id: string;
  name: string;
  phone: string;
  serviceType: string;
  area?: string;
  address: string;
  status: string;
  createdAt: string;
};

export default function AdminDashboardPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  // token (unchanged)
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("admin_token")
      : null;

  useEffect(() => {
    if (!token) {
      router.push("/admin/login");
      return;
    }
    fetchBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchBookings() {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL || ""}/api/admin/bookings`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();
      setBookings(data.bookings || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(id: string, status: string) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL || ""}/api/admin/bookings/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );
      if (!res.ok) {
        console.error("Failed to update status");
        return;
      }
      setBookings((b) =>
        b.map((x) => (x._id === id ? { ...x, status } : x))
      );
    } catch (err) {
      console.error(err);
    }
  }

  function logout() {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    router.push("/admin/login");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 pb-10">
      {/* Header (mobile-first sticky) */}
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-lg border-b border-slate-200 px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-600 to-orange-500 rounded-lg flex items-center justify-center">
            <ClipboardList className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold text-slate-900">Admin Dashboard</h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchBookings}
            className="flex items-center gap-1 bg-orange-50 text-orange-700 px-3 py-2 rounded-lg text-sm font-semibold hover:bg-orange-100 transition"
          >
            <RefreshCw className="w-4 h-4" /> Refresh
          </button>

          <button
            onClick={logout}
            className="flex items-center gap-1 bg-slate-200 text-slate-700 px-3 py-2 rounded-lg text-sm font-semibold hover:bg-slate-300 transition"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="px-4 mt-6 max-w-6xl mx-auto">
        {loading ? (
          <p className="text-center text-slate-600">Loading...</p>
        ) : bookings.length === 0 ? (
          <p className="text-center text-slate-600">No bookings yet</p>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-100 text-slate-700 text-xs font-semibold">
                <tr>
                  <th className="text-left p-4">Time</th>
                  <th className="text-left p-4">Customer</th>
                  <th className="text-left p-4">Service</th>
                  <th className="text-left p-4">Area</th>
                  <th className="text-left p-4">Address</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {bookings.map((b) => (
                  <tr
                    key={b._id}
                    className="border-t border-slate-200 hover:bg-slate-50 transition"
                  >
                    <td className="p-4 text-slate-700">
                      {new Date(b.createdAt).toLocaleString()}
                    </td>

                    <td className="p-4 text-slate-800">
                      {b.name}
                      <div className="text-xs text-slate-500">{b.phone}</div>
                    </td>

                    <td className="p-4 text-slate-700">{b.serviceType}</td>
                    <td className="p-4 text-slate-700">{b.area || "-"}</td>
                    <td className="p-4 text-slate-700">{b.address}</td>

                    <td className="p-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          b.status === "completed"
                            ? "bg-green-100 text-green-700"
                            : b.status === "on-the-way"
                            ? "bg-orange-100 text-orange-700"
                            : b.status === "assigned"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>

                    <td className="p-4 space-x-2">
                      {b.status !== "assigned" && (
                        <button
                          onClick={() => updateStatus(b._id, "assigned")}
                          className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-full hover:bg-blue-700 transition"
                        >
                          Assign
                        </button>
                      )}

                      {b.status !== "on-the-way" && (
                        <button
                          onClick={() => updateStatus(b._id, "on-the-way")}
                          className="text-xs bg-orange-600 text-white px-3 py-1.5 rounded-full hover:bg-orange-700 transition"
                        >
                          On the way
                        </button>
                      )}

                      {b.status !== "completed" && (
                        <button
                          onClick={() => updateStatus(b._id, "completed")}
                          className="text-xs bg-green-600 text-white px-3 py-1.5 rounded-full hover:bg-green-700 transition"
                        >
                          Complete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      <footer className="mt-10 text-center text-slate-500 text-sm">
        © 2025 Zletto Admin
      </footer>
    </div>
  );
}
