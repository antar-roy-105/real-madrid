"use client";

import { useEffect } from "react";
import VideoPlayer from "@/components/VideoPlayer";
import HeroSlider from "@/components/HeroSlider";
import FeaturedSection from "@/components/FeaturedSection";
import TourSection from "@/components/TourSection";
import CorporateSection from "@/components/CorporateSection";
import FeaturesSection from "@/components/FeaturesSection";
import StadiumTourSection from "@/components/StadiumTourSection";
import CorporateEventsGallery from "@/components/CorporateEventsGallery";

export default function DashboardPage() {
  // Scroll-triggered fade-in animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 }
    );

    const fadeElements = document.querySelectorAll(".fade-up");
    fadeElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="w-full bg-[#f4f7fa] font-secondary mt-[70px]">
      <VideoPlayer />
      <HeroSlider />
      <FeaturedSection />
      <TourSection />
      <CorporateSection />
      <FeaturesSection />
      <CorporateEventsGallery />
    </main>
  );
}
