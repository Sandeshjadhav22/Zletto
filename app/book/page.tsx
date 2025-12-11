"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Wrench } from "lucide-react";

export default function BookPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    serviceType: "electrician",
    name: "",
    phone: "",
    address: "",
    description: "",
    preferredDate: "",
    preferredTime: "",
    area: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // minimal validation (unchanged)
    if (!form.name || !form.phone || !form.address) {
      setError("Please fill name, phone and address.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || ""}/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      setLoading(false);
      if (!res.ok) {
        setError(data.error || "Failed to book");
        return;
      }

      // redirect to confirmation with booking id (unchanged)
      router.push(`/booking-confirmation?bookingId=${data.bookingId}`);
    } catch (err) {
      setLoading(false);
      setError("Network error");
    }
  };

  // helper class for consistent inputs
  const inputClass = "w-full rounded-xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-200 placeholder-slate-400 text-slate-700";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 py-6 px-4">
      <main className="max-w-3xl mx-auto">

        {/* Page header - mobile first */}
        <header className="mb-6">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-orange-600 to-orange-700 flex items-center justify-center">
              <Wrench className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Book a Service</h1>
              <p className="text-sm text-slate-600">Fast, trusted professionals at your doorstep.</p>
            </div>
          </div>
        </header>

        {/* Form Card (mobile-first full width) */}
        <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <form id="booking-form" onSubmit={handleSubmit} className="space-y-4">
            <label className="block text-sm font-semibold text-slate-700">Service</label>
            <select
              name="serviceType"
              value={form.serviceType}
              onChange={handleChange}
              className={`${inputClass} appearance-none`}
            >
              <option value="electrician">Electrician</option>
              <option value="plumbing">Plumber</option>
              <option value="carpenter">Carpenter</option>
              <option value="home cleaning">Home Cleaning</option>
              <option value="pest control">Pest Control</option>
            </select>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Full name</label>
                <input
                  name="name"
                  placeholder="Full name"
                  value={form.name}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Phone</label>
                <input
                  name="phone"
                  placeholder="Phone"
                  value={form.phone}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Area / Landmark</label>
              <input
                name="area"
                placeholder="Area / Locality"
                value={form.area}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Full address</label>
              <input
                name="address"
                placeholder="Full address"
                value={form.address}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Describe the issue</label>
              <textarea
                name="description"
                placeholder="Describe the issue"
                value={form.description}
                onChange={handleChange}
                rows={4}
                className={`${inputClass} resize-none`}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Preferred date</label>
                <input
                  type="date"
                  name="preferredDate"
                  value={form.preferredDate}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Preferred time</label>
                <input
                  type="time"
                  name="preferredTime"
                  value={form.preferredTime}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>

            {error && <div className="text-red-600">{error}</div>}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:shadow-xl transition-all duration-200 disabled:opacity-60"
              >
                {loading ? "Booking..." : "Book Now"}
              </button>
            </div>
          </form>
        </section>

        {/* Visual / Hero card — mobile-first placed AFTER form so mobile users see form immediately */}
        <aside className="mt-5">
          <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-4 flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-600 to-orange-600 flex items-center justify-center shrink-0">
              <Wrench className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-baseline gap-3">
                <h3 className="text-xl font-bold text-slate-900">Trusted Pros</h3>
                <span className="text-sm text-slate-500">• Background checked</span>
              </div>
              <p className="text-sm text-slate-600 mt-2">Real-time dispatch and average arrival in <strong className="text-orange-600">20 minutes</strong>.</p>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-orange-50 px-3 py-2 text-center">
                  <div className="text-lg font-bold text-orange-600">20</div>
                  <div className="text-xs text-slate-600">Minutes</div>
                </div>
                <div className="rounded-lg bg-slate-50 px-3 py-2">
                  <div className="text-sm  text-orange-600 font-semibold">Support</div>
                  <div className="text-xs text-slate-600">WhatsApp: <a href="tel:+919876543210" className="text-orange-600 font-semibold">+91 9619151523</a></div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Small hint card */}
        <div className="mt-5">
          <div className="rounded-xl bg-white border border-slate-100 p-4 shadow-sm text-sm text-slate-700">
            <strong>Need help?</strong>
            <p className="mt-1">Call or WhatsApp us at <a href="tel:+919876543210" className="text-orange-600 font-semibold">+91 9619151523</a></p>
          </div>
        </div>

      </main>

      {/* Footer (compact for mobile) */}
      <footer className="mt-8 text-center text-slate-500 text-sm">
        <p>&copy; 2025 Zletto. All rights reserved.</p>
      </footer>
    </div>
  );
}
