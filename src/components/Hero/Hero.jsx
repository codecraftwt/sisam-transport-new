import React, { useEffect, useRef, Suspense, useState, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { Canvas } from '@react-three/fiber';
import { Sparkles, Cloud } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import './Hero.css';
import Earth from '../Models3D/ModelEarth3D';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef(null);
  const textContentRef = useRef(null);
  const illustrationRef = useRef(null);
  const ctaButtonRef = useRef(null);
  const subtitleRef = useRef(null);
  const heroContentRef = useRef(null);

  const [earthPosition] = useState([1.7, 0.5, -0.9]);
  const [earthScale] = useState(1.8);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      heroRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: 'power2.out' }
    )
      .fromTo(
        subtitleRef.current,
        { x: -400, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: 'power4.out' },
        '-=0.6'
      )
      .to({}, { duration: 0.2 })
      .fromTo(
        textContentRef.current,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
        '-=0.5'
      )
      .to({}, { duration: 0.3 })
      .fromTo(
        illustrationRef.current,
        { x: 50, opacity: 0, scale: 0.8 },
        { x: 0, opacity: 1, scale: 1, duration: 1, ease: 'back.out(1.7)' },
        '-=0.6'
      )
      .to({}, { duration: 0.2 })
      .fromTo(
        ctaButtonRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.4'
      )
      .to({}, { duration: 0.4 })
      .fromTo(
        heroContentRef.current,
        { y: 300, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
        '-=0.4'
      );

    const handleEnter = () => {
      gsap.to(ctaButtonRef.current, { scale: 1.05, duration: 0.3 });
    };
    const handleLeave = () => {
      gsap.to(ctaButtonRef.current, { scale: 1, duration: 0.3 });
    };

    if (ctaButtonRef.current) {
      ctaButtonRef.current.addEventListener('mouseenter', handleEnter);
      ctaButtonRef.current.addEventListener('mouseleave', handleLeave);
    }

    return () => {
      if (ctaButtonRef.current) {
        ctaButtonRef.current.removeEventListener('mouseenter', handleEnter);
        ctaButtonRef.current.removeEventListener('mouseleave', handleLeave);
      }
    };
  }, []);

// useLayoutEffect(() => {
//   gsap.to(".hero-text", {
//     y: 100,
//     opacity: 1,
//     // scale:3,
//     scrollTrigger: {
//       trigger: ".hero-text",
//       start: "top 80%",
//       end: "bottom 20%",
//       scrub: 2,
//     },
//   });
// }, []);


  return (
    <section className="hero" ref={heroRef}>
      <Canvas className="hero-bg-canvas" style={{ position: 'absolute', top: 0, left: 0, }}>
        <Sparkles
          count={500}
          scale={[30, 30, 30]}
          size={1.5}
          speed={0.6}
          opacity={0.8}
          color="#ffffff"
        />
        <EffectComposer>
          <Bloom
            luminanceThreshold={0.5}
            luminanceSmoothing={0.9}
            height={300}
            opacity={1.9}
          />
        </EffectComposer>
      </Canvas>

          <div className="hero-container">
        <div className="hero-illustration" ref={illustrationRef}>
          <Canvas
            camera={{ position: [0, 0, 3.4], fov: 75 }}
            style={{
              background: 'transparent',
              width: '100%',
              height: '100%',
            }}
          >
            <ambientLight intensity={1.9} />
            <directionalLight position={[10, 12, 5]} intensity={10} />
            <pointLight position={[-10, -10, -5]} intensity={0.9} />

            <Suspense fallback={null}>
              <Earth position={earthPosition} scale={earthScale} />
            </Suspense>
            {/* <Suspense fallback={null}>
              <CloudModel position={[-4, -1.2, 0]} scale={5} />
            </Suspense> */}

            {/* <OrbitControls
              enableZoom={false}
              enablePan={false}
              maxPolarAngle={Math.PI}
              minPolarAngle={0}
              enableDamping
              dampingFactor={0.05}
            /> */}
          </Canvas>
        </div>

        <div className="hero-content" ref={heroContentRef}>
          <div className="hero-subtitle" style={{paddingTop:"35px "}} ref={subtitleRef}>
            <span className="subtitle-text">INNOVATION & SPEED</span>
            <div className="subtitle-line"></div>
          </div>
          <h1 className="hero-title">
            <span className="title-welcome">WELCOME</span>
            <span className="title-brand">TO SISAM</span>
          </h1>
          <p className="hero-description">
            Sisam provides full liner representation to global or niche
            operators, each a specialist in their own market.
          </p>
          <button className="hero-cta" ref={ctaButtonRef}>
            Read More →
          </button>
        </div>

        {/* <div className='hero-text' style={{fontSize:"30px" ,fontWeight:"800",color:"#212121" ,paddingLeft:"70px",paddingTop:"200px"}}> hello worldwide
          <h2 style={{fontSize:"22px" ,fontWeight:"700",color:"#212121" }}>lorem ipsum dolor sit amet <br/> consectetur adipiscing elit sed do eiusmod tempor  <br/>incididunt ut labore et dolore magna aliqua </h2>
        </div> */}
      </div>
    </section>
  );
};

export default Hero;
