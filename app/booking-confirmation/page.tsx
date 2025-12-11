"use client";
export const dynamic = "force-dynamic";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Check, Phone } from "lucide-react";

type Booking = {
  _id: string;
  serviceType: string;
  name: string;
  phone: string;
  address: string;
  description?: string;
  preferredDate?: string | null;
  preferredTime?: string | null;
  status?: string;
  area?: string;
  createdAt?: string;
};

export default function Confirmation() {
  const params = useSearchParams();
  const bookingId = params?.get("bookingId") ?? null;

  const [loading, setLoading] = useState<boolean>(!!bookingId);
  const [booking, setBooking] = useState<Booking | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!bookingId) return;

    let mounted = true;

    async function fetchBooking() {
      try {
        if (mounted) {
          setLoading(true); // unchanged behavior
          setError(null);
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL || ""}/api/bookings/${bookingId}`
        );
        if (!res.ok) throw new Error(`Server returned ${res.status}`);

        const data: { booking?: Booking } = await res.json();

        if (mounted) {
          setBooking(data.booking ?? null);
          setLoading(false);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        if (mounted) {
          setError(err.message || "Failed to load booking");
          setLoading(false);
        }
      }
    }

    fetchBooking();

    return () => {
      mounted = false;
    };
  }, [bookingId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 py-6 px-4">
      <main className="max-w-3xl mx-auto">
        {/* Header (mobile-first) */}
        <header className="mb-6 flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-orange-600 to-orange-700 flex items-center justify-center">
            <Check className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Booking Confirmation</h1>
            <p className="text-sm text-slate-600">Thanks, we received your booking.</p>
          </div>
        </header>

        {/* Banner / hero */}
        <div className="w-full rounded-2xl overflow-hidden mb-6 bg-gradient-to-r from-orange-600 to-orange-600 text-white">
          {/* optional banner image fallback: keep same behavior but themed */}
          <div className="p-6">
            <h2 className="text-xl font-semibold">You&rsquo;re all set!</h2>
            <p className="mt-1 text-sm opacity-90">We’ll dispatch a trusted professional to your location.</p>
          </div>
        </div>

        {/* Main grid: details + side note (mobile stacked) */}
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900 mb-3">Booking details</h3>

            {loading && <p className="text-slate-600">Loading your booking details...</p>}
            {error && <p className="text-red-600">{error}</p>}

            {!loading && !booking && !error && (
              <p className="text-slate-700">
                Your booking ID: <strong className="text-slate-900">{bookingId}</strong>
              </p>
            )}

            {booking && !loading && (
              <div className="space-y-3 text-slate-700">
                <div>
                  <div className="text-xs text-slate-500">Service</div>
                  <div className="font-medium text-slate-900">{booking.serviceType}</div>
                </div>

                <div>
                  <div className="text-xs text-slate-500">Name</div>
                  <div className="font-medium text-slate-900">{booking.name}</div>
                </div>

                <div>
                  <div className="text-xs text-slate-500">Phone</div>
                  <div className="font-medium text-slate-900">{booking.phone}</div>
                </div>

                <div>
                  <div className="text-xs text-slate-500">Address</div>
                  <div className="font-medium text-slate-900">{booking.address}</div>
                </div>

                {booking.description && (
                  <div>
                    <div className="text-xs text-slate-500">Notes</div>
                    <div className="text-slate-700">{booking.description}</div>
                  </div>
                )}

                <div className="mt-3 text-slate-700">
                  We’ll call you within <strong className="text-orange-600">20 minutes</strong>. For urgent help:&nbsp;
                  <a className="text-orange-600 underline" href="https://wa.me/919619151523">WhatsApp +91 9619151523</a>
                </div>
              </div>
            )}

            {/* Action */}
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => (window.location.href = "/")}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-3 rounded-full text-sm font-semibold hover:shadow-lg transition"
              >
                Okay
              </button>

              <a
                href="https://wa.me/919619151523"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-full border border-slate-200 text-slate-700 text-sm"
              >
                <Phone className="w-4 h-4" />
                WhatsApp
              </a>
            </div>
          </div>

          <aside className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm text-slate-700">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-600 to-orange-600 flex items-center justify-center text-white">
                <Check className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-900">What happens next?</h4>
                <ul className="mt-2 space-y-2 text-sm text-slate-600">
                  <li>• We confirm the technician and dispatch to your address.</li>
                  <li>• Technician calls you to confirm arrival time.</li>
                  <li>• You can contact support via WhatsApp or hotline.</li>
                </ul>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div className="rounded-lg bg-orange-50 px-3 py-2 text-center">
                    <div className="text-lg font-bold text-orange-600">20</div>
                    <div className="text-xs text-slate-600">Minutes</div>
                  </div>
                  <div className="rounded-lg bg-slate-50 px-3 py-2">
                    <div className="text-sm font-semibold">Call Us</div>
                    <div className="text-xs text-slate-600">+91 9619151523</div>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <footer className="mt-8 text-center text-slate-500 text-sm">
        <p>&copy; 2025 Zletto. All rights reserved.</p>
      </footer>
    </div>
  );
}
