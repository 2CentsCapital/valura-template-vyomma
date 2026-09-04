import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import TrustMarquee from "./components/sections/TrustMarquee";
import CustomerSupport from "./components/sections/CustomerSupport";
import Testimonials from "./components/sections/Testimonials";
import FeatureCollection from "./components/sections/FeatureCollection";
import DashboardAnalytics from "./components/sections/DashboardAnalytics";
import OpenAccount from "./components/sections/OpenAccount";
import FAQ from "./components/sections/FAQ";
import Footer from "./components/sections/Footer";

export default function App() {
  useEffect(() => {
    // Initialize Lenis smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // Synchronize Lenis scroll with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(updateTicker);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-['Inter',sans-serif] antialiased selection:bg-blue-500 selection:text-white">
      {/* Sticky Top Navigation Bar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 w-full">
        <Hero />
        <TrustMarquee />
        <CustomerSupport />
        <Testimonials />
        <FeatureCollection />
        <DashboardAnalytics />
        <OpenAccount />
        <FAQ />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
