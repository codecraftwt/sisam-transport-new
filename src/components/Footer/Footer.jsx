import React, { useRef, useMemo, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import "./Footer.css"
import {
  FaFacebookF,
  FaInstagram,
  FaTelegramPlane,
  FaLinkedin,
} from "react-icons/fa";
import logo from "../../assets/Sisamlogo.png";

function createCircleTexture() {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;

  const ctx = canvas.getContext("2d");
  const gradient = ctx.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2
  );
  gradient.addColorStop(0, "white");
  gradient.addColorStop(1, "transparent");

  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
  ctx.fill();

  return new THREE.CanvasTexture(canvas);
}

function ParticlesBackground({ count = 1200 }) {
  const mesh = useRef();
  const circleTexture = useMemo(() => createCircleTexture(), []);
  const mouse = useRef({ x: 0, y: 0 });
  const gyro = useRef({ x: 0, y: 0 });

  const particlesData = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 5 + Math.random() * 6;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return { positions };
  }, [count]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const handleOrientation = (e) => {
      gyro.current.x = e.gamma / 45;
      gyro.current.y = e.beta / 45;
    };
    window.addEventListener("deviceorientation", handleOrientation, true);
    return () =>
      window.removeEventListener("deviceorientation", handleOrientation);
  }, []);

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.y += 0.0005;
      mesh.current.rotation.x += 0.0002;

      const mixX = mouse.current.x * 0.002 + gyro.current.x * 0.01;
      const mixY = mouse.current.y * 0.002 + gyro.current.y * 0.01;

      mesh.current.rotation.y += mixX;
      mesh.current.rotation.x += mixY;
    }
  });

  return (
    <group ref={mesh}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particlesData.positions.length / 3}
            array={particlesData.positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.07}
          map={circleTexture}
          transparent
          opacity={0.65}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

export default function Footer() {
  const container = useRef();
  gsap.registerPlugin(useGSAP);

  useGSAP(
    () => {
      gsap.fromTo(
        [
          ".contact-help",
          ".footer-logo-section",
          ".footer-section",
        ],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.2,
        }
      );
    },
    { scope: container }
  );

  return (
    <div
      ref={container}
      style={{
        width: "100vw",
        minHeight: "100vh",
        background: "#000",
        position: "relative",
        overflowX: "hidden",
        overflowY: "auto",
        fontFamily: "Arial, sans-serif",
        color: "#fff",
      }}
    >
     

      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Canvas camera={{ position: [0, 0, 9] }}>
          <ambientLight intensity={0.6} />
          <ParticlesBackground count={1200} />
        </Canvas>
      </div>

   <div
  className="contact-help"
  style={{
    position: "relative",
    margin: "40px auto",
    zIndex: 2,
    backgroundColor: "#FFBC00",
    borderRadius: 14,
    padding: "26px 36px",
    width: "90%",
    maxWidth: 1100,
    boxShadow: "0 7px 24px rgba(0,0,0,0.14)",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "20px",
  }}
>
  {/* Left content */}
  <div
    style={{
      flex: "1 1 300px",
      textAlign: "left",
    }}
  >
    <h3 style={{ margin: 0, fontWeight: "bold", fontSize: "24px", color: "#fff" }}>
      Need Any Help?
    </h3>
    <h3 style={{ margin: 0, fontWeight: "bold", fontSize: "20px", color: "#fff" }}>
      Contact Us!
    </h3>
    <p style={{ margin: 0, fontWeight: 600, fontSize: "18px", color: "#fff" }}>
      📞 +390586243814
    </p>
  </div>

  <form
    onSubmit={(e) => e.preventDefault()}
    style={{
      flex: "1 1 300px",
      display: "flex",
      justifyContent: "flex-end",
      flexWrap: "wrap",
      gap: "12px",
      maxWidth: "400px", 
    }}
  >
    <input
      type="email"
      placeholder="Enter your email"
      style={{
        flex: "1 1 200px",
        padding: "12px 16px",
        borderRadius: 5,
        border: "none",
        fontSize: 15,
        minWidth: "180px",
      }}
    />
    <button
      type="submit"
      style={{
        backgroundColor: "#0a3a75",
        color: "white",
        border: "none",
        borderRadius: 5,
        padding: "12px 26px",
        cursor: "pointer",
        fontWeight: 600,
        fontSize: 15,
        whiteSpace: "nowrap",
      }}
    >
      Subscribe Now →
    </button>
  </form>

 <style>
  {`
    @media (max-width: 768px) {

      .contact-help {
        display: none !important; 
  }
      .footer-container {
        height: auto !important;
        min-height: 100% !important;
      }
      .footer-sections {
        flex-direction: column !important;
        align-items: center !important;
        padding: 20px ;
       

      }
    }
  `}
</style>

</div>



      {/* Footer Sections */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
            flex: 1,           
        flexDirection: "column",
        }}
      >
        <div
          className="footer-sections"
          style={{
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
            gap: 36,
            // marginTop: 120,
            alignItems: "flex-start",
          }}
        >
          <div className="footer-logo-section" style={{ flex: "0 0 260px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 15,
                marginBottom: 14,
              }}
            >
              <img
                src={logo}
                alt="Logo"
                style={{
                  width: 75,
                  height: 75,
                  objectFit: "contain",
                  borderRadius: 7,
                  boxShadow: "0 3px 7px rgba(0,0,0,0.10)",
                }}
              />
            </div>
            <p style={{ fontSize: 17, maxWidth: 320, opacity: 0.8 }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
            <div style={{ marginTop: 20, display: "flex", gap: 23, fontSize: 26 }}>
              <a href="#" style={{ color: "white" }}><FaFacebookF /></a>
              <a href="#" style={{ color: "white" }}><FaInstagram /></a>
              <a href="#" style={{ color: "white" }}><FaTelegramPlane /></a>
              <a href="#" style={{ color: "white" }}><FaLinkedin /></a>
            </div>
          </div>

          <div className="footer-link" style={{ flex: "0 0 240px" }}>
            <h4 style={{ marginBottom: 14 }}>QUICK LINKS</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li><a href="#" style={{ color: "white", lineHeight: "2.3" }}>Home</a></li>
              <li><a href="#" style={{ color: "white", lineHeight: "2.3" }}>About Us</a></li>
              <li><a href="#" style={{ color: "white", lineHeight: "2.3" }}>Service</a></li>
              <li><a href="#" style={{ color: "white", lineHeight: "2.3" }}>Blog</a></li>
              <li><a href="#" style={{ color: "white", lineHeight: "2.3" }}>Contact Us</a></li>
            </ul>
          </div>

          <div className="footer-section" style={{ flex: "0 0 260px" }}>
            <h4 style={{ marginBottom: 14 }}>ADDRESS</h4>
            <p style={{ fontSize: 15, maxWidth: 325, opacity: 0.8 }}>
              Scali Cerere 15, Livorno, Italy 57122
            </p>
            <p style={{ margin: 0 }}>Phone: +390586243814</p>
          </div>
        </div>

        <div className="footer-copyright"

          style={{
            textAlign: "center",
            marginTop: 120,
            fontSize: 13,
            letterSpacing: 1,
            padding: "20px 0",
          }}
        >
          © Sisam 2025 All Rights Reserved
        </div>
      </div>
    </div>
  );
}
