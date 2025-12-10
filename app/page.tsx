"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Phone,
  Wrench,
  Droplets,
  Hammer,
  Sparkles,
  Bug,
  Clock,
  MapPin,
  Check,
} from "lucide-react";
import { useRouter } from "next/navigation";

const LandingPage = () => {
  const router = useRouter();

  const [isBookingOpen, setIsBookingOpen] = useState(false);

 // 🔥 ROTATING WORDS (TypeScript-friendly)
const WORDS = ["Technician", "Plumber", "Carpenter", "Electrician"];
const INTERVAL = 2500;
const ANIM = 600;

const [index, setIndex] = useState<number>(0);
// prev can be a string (the old word) or null while no previous word is rendered
const [prev, setPrev] = useState<string | null>(null);

useEffect(() => {
  const id = window.setInterval(() => {
    setPrev(WORDS[index]);
    setIndex((i) => (i + 1) % WORDS.length);

    // clear prev after animation finishes
    window.setTimeout(() => setPrev(null), ANIM);
  }, INTERVAL);

  return () => clearInterval(id);
  // keep index in deps so the interval logic references the latest index
}, [index]);


  const current = WORDS[index];

  const services = [
    { icon: <Wrench className="w-6 h-6" />, name: "Electrician", color: "from-amber-500 to-orange-500" },
    { icon: <Droplets className="w-6 h-6" />, name: "Plumber", color: "from-amber-500 to-orange-500" },
    { icon: <Hammer className="w-6 h-6" />, name: "Carpenter", color: "from-amber-500 to-orange-500" },
    { icon: <Sparkles className="w-6 h-6" />, name: "Home Cleaning", color: "from-amber-500 to-orange-500" },
    { icon: <Bug className="w-6 h-6" />, name: "Pest Control", color: "from-amber-500 to-orange-500" },
  ];

  const steps = [
    { number: "01", title: "Book", description: "Select your service and share details" },
    { number: "02", title: "We dispatch", description: "Expert assigned within minutes" },
    { number: "03", title: "Tech arrives", description: "Trusted professional at your door in 20 minutes" },
  ];

  // -------------------------
  // Mobile CTA visibility: only show when Services section is visible
  // -------------------------
  const servicesRef = useRef(null);
  const [showMobileCTA, setShowMobileCTA] = useState(false);

  useEffect(() => {
    if (!servicesRef.current) return;
    const el = servicesRef.current;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => setShowMobileCTA(entry.isIntersecting)),
      { root: null, threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [servicesRef]);

  // helper to navigate to /book
  const goToBook = (service?: string) => {
    // if caller passes a service, include as query param
    if (service) {
      router.push(`/book?service=${encodeURIComponent(service)}`);
    } else {
      router.push("/book");
    }
  };

  // ---------- Image slider ----------
  const sliderImages = [
    "/plumber.png",
    "/carpenter.png",
    "/electrician.png",
  ];
  const [slide, setSlide] = useState(0);
  const slideInterval = 3500; // ms

  useEffect(() => {
    const t = window.setInterval(() => {
      setSlide((s) => (s + 1) % sliderImages.length);
    }, slideInterval);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* 🔥 Animation CSS */}
      <style>{`
        @keyframes fadeInUp { 0% { opacity: 0; transform: translateY(8px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes fadeOutUp { 0% { opacity: 1; transform: translateY(0); } 100% { opacity: 0; transform: translateY(-6px); } }
        .word-enter { animation: fadeInUp ${ANIM}ms ease forwards; }
        .word-exit  { animation: fadeOutUp ${ANIM}ms ease forwards; }
      `}</style>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-lg border-b border-slate-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-600 to-orange-600 rounded-lg flex items-center justify-center">
                <Wrench className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent">Zletto</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#services" className="text-slate-600 font-semibold hover:text-orange-600 transition-colors text-sm ">Services</a>
              <a href="#how-it-works" className="text-slate-600 hover:text-orange-600 transition-colors text-sm font-semibold">How it works</a>
              <a href="tel:+919876543210" className="text-slate-600 hover:text-orange-600 transition-colors text-sm font-semibold">Contact</a>
            </div>
            <button onClick={() => goToBook()} className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2 rounded-full text-sm font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300">
              Book Now
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-2 bg-orange-50 text-orange-700 px-4 py-2 rounded-full text-sm font-bold border border-orange-100">
                <MapPin className="w-4 h-4" />
                <span>Available in Thane</span>
              </div>

              {/* HERO HEADING WITH ROTATING WORD */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05]">
                <span className="text-slate-700 block mb-3 relative h-[1em]">
                  {prev && (<span className="absolute left-0 top-0 word-exit">{prev}</span>)}
                  <span className="word-enter">{current}</span>
                </span>

                <span className="bg-gradient-to-r from-slate-700 to-slate-700 bg-clip-text text-transparent block mb-3">your door in</span>

                <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent block">20 minutes</span>
              </h1>

              <p className="text-xl text-slate-600 max-w-lg">Trusted electricians, plumbers & more in Thane. Fast, reliable home services when you need them most.</p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={() => goToBook()} className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2">
                  <span>Book Now</span>
                </button>

                <a href="https://wa.me/919876543210" className="bg-white border-2 border-slate-200 text-slate-900 px-8 py-4 rounded-full text-lg font-semibold hover:border-slate-300 hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2">
                  <Phone className="w-5 h-5" /> <span>WhatsApp Us</span>
                </a>
              </div>

              <div className="flex items-center space-x-6 text-sm text-slate-600">
                <div className="flex items-center space-x-2"><Check className="w-5 h-5 text-green-600" /><span>Background verified</span></div>
                <div className="flex items-center space-x-2"><Check className="w-5 h-5 text-green-600" /><span>Trusted professionals</span></div>
              </div>
            </div>

            {/* RIGHT SIDE: image slider (replaces pink box). visible on lg and up */}
            <div className="relative hidden lg:block">
              <div className="aspect-square rounded-3xl p-4 flex items-center justify-center overflow-hidden" style={{ minHeight: 420 }}>
                {/* slider container */}
                <div className="w-full h-full relative rounded-3xl" aria-hidden>
                  {sliderImages.map((src, i) => {
                    const isActive = i === slide;
                    return (
                      <img
                        key={src}
                        src={src}
                        alt={`slide-${i}`}
                        className={`absolute inset-0 w-full h-full object-cover rounded-3xl transition-opacity duration-700 ease-in-out ${isActive ? "opacity-100 scale-100" : "opacity-0 scale-105"}`}
                        style={{ transitionProperty: "opacity, transform" }}
                      />
                    );
                  })}
                </div>

                {/* optional small indicators */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                  {sliderImages.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setSlide(i)}
                      className={`w-2.5 h-2.5 rounded-full ${i === slide ? "bg-white" : "bg-white/50"}`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" ref={servicesRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">Our Services</h2>
            <p className="text-xl text-slate-600">Professional home services at your fingertips</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {services.map((service, idx) => (
              <button
                key={idx}
                onClick={() => goToBook(service.name)}
                className="group bg-white border-2 border-slate-200 rounded-2xl p-8 hover:border-transparent hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {service.icon}
                </div>
                <h3 className="text-lg font-semibold text-slate-900">{service.name}</h3>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">How It Works</h2>
            <p className="text-xl text-slate-600">Three simple steps to get your home fixed</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white border-2 border-slate-200 rounded-2xl p-8 hover:shadow-xl transition-all duration-300">
                  <div className="text-6xl font-bold bg-gradient-to-r from-orange-600 to-orange-600 bg-clip-text text-transparent mb-4">{step.number}</div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{step.title}</h3>
                  <p className="text-slate-600">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-pink-600 to-rose-600" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FF5200]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">Need help right now?</h2>
          <p className="text-xl font-bold text-pink-100 mb-8">Book your service and get a trusted technician within 20 minutes</p>
          <button onClick={() => goToBook()} className="bg-white text-orange-600 px-10 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300">Book Now</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-pink-600 to-rose-600 rounded-lg flex items-center justify-center">
                  <Wrench className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Zletto</span>
              </div>
              <p className="text-slate-400">Trusted home services in Thane. Fast, reliable, professional.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-slate-400">
                <p>WhatsApp: +91 98765 43210</p>
                <p>Hotline: +91 98765 43210</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Areas Covered</h4>
              <p className="text-slate-400">Hiranandini Estate, Highland, Brahmand, Kolshet in Thane.</p>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-slate-400 text-sm">
            <p>&copy; 2025 Zletto. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Mobile Sticky CTA */}
      {showMobileCTA && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 md:hidden z-40">
          <button onClick={() => goToBook()} className="w-full bg-gradient-to-r from-orange-600 to-orange-600 text-white px-6 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all duration-300">Book Now — Technician in 20 min</button>
        </div>
      )}

      {/* Booking Modal */}
      {isBookingOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Book Your Service</h3>
            <p className="text-slate-600 mb-6">Booking form will go here. For now, please call or WhatsApp us!</p>
            <div className="space-y-3">
              <a href="https://wa.me/919876543210" className="block w-full bg-gradient-to-r from-pink-600 to-rose-600 text-white px-6 py-3 rounded-full text-center font-semibold">WhatsApp Us</a>
              <button onClick={() => setIsBookingOpen(false)} className="block w-full bg-slate-100 text-slate-900 px-6 py-3 rounded-full text-center font-semibold">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
