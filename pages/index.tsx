import { LandingNavbar } from "@/components/landing-navbar";
import { LandingHero } from "@/components/landing-hero";
import { useEffect } from "react";

export default function Home() {
  return (
    <main className="h-full min-h-screen w-full bg-[#111827] overflow-auto">
      <div className="mx-auto max-w-screen-xl h-full w-full">
        <div className="h-full ">
          <LandingNavbar />
          <LandingHero />
        </div>
      </div>
    </main>
  );
}
