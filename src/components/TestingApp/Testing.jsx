import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ThreeScene from "./Components/ThreeScene";

gsap.registerPlugin(ScrollTrigger);

export default function Testing() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to({}, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=1000", // how long the section lasts
          // end: "bottom top", // how long the section lasts
          // end: () => "+=" + window.innerHeight * 0.34,
          scrub: true,
          pin: true,
          onUpdate: (self) => {
            const progress = self.progress;
            // 🔍 Log scroll trigger progress
            console.log(`🌀 ScrollTrigger progress: ${progress.toFixed(2)}`);
            window.dispatchEvent(new CustomEvent("threeScroll", { detail: progress }));
          }
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div>
      {/* Section 1: 3D Globe */}
      <section ref={sectionRef} className="h-screen bg-white text-white">
        <ThreeScene />
      </section>

      {/* Section 2: Content */}
      <section className="h-screen bg-gray-800 text-white">
        <h1 className="text-3xl text-center font-bold">Testing Page</h1>
        <p className="text-center mt-4">This is a testing page for Three.js components.</p>
      </section>
    </div>
  );
}
