import React, { useRef } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import * as THREE from "three";
import gsap from "gsap";

function GridBackground() {
  return (
    <gridHelper args={[10, 10, "#cce7ff", "#cce7ff"]} position={[0, -0.01, 0]} />
  );
}

function LogoCard({ textureUrl, position }) {
  const logoRef = useRef();
  const frameRef = useRef();

  let texture;
  try {
    texture = useLoader(TextureLoader, textureUrl);
  } catch {
    texture = null;
  }

  const handleHover = () => {
    gsap.to(frameRef.current.material, { opacity: 1, duration: 0.4 });
    gsap.to(logoRef.current.scale, { x: 1.2, y: 1.2, duration: 0.3 });
  };

  const handleOut = () => {
    gsap.to(frameRef.current.material, { opacity: 0, duration: 0.4 });
    gsap.to(logoRef.current.scale, { x: 1, y: 1, duration: 0.3 });
  };

  return (
    <group position={position}>
      {/* Glowing frame */}
      <lineSegments ref={frameRef} position={[0, 0.02, 0]}>
        <edgesGeometry args={[new THREE.PlaneGeometry(2.2, 1.2)]} />
        <lineBasicMaterial color="#00cfff" transparent opacity={0} />
      </lineSegments>

      {/* Logo (image if available, else fallback color) */}
      <mesh
        ref={logoRef}
        position={[0, 0.01, 0]}
        onPointerOver={handleHover}
        onPointerOut={handleOut}
      >
        <planeGeometry args={[2, 1]} />
        {texture ? (
          <meshBasicMaterial map={texture} transparent />
        ) : (
          <meshStandardMaterial color="orange" />
        )}
      </mesh>
    </group>
  );
}

export default function LogoGridScene() {
  return (
    <Canvas camera={{ position: [0, 3, 6], fov: 50 }}>
      <ambientLight intensity={1} />
      <directionalLight position={[5, 10, 5]} intensity={1.5} />

      <GridBackground />

      {/* Change textureUrl to a local file in public/, e.g. "/demo.png" */}
      <LogoCard textureUrl="/demo.png" position={[-3, 0, 0]} />
      <LogoCard textureUrl="/demo.png" position={[0, 0, 0]} />
      <LogoCard textureUrl="/demo.png" position={[3, 0, 0]} />
    </Canvas>
  );
}
