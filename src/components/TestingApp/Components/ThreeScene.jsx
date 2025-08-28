import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef, useEffect } from "react";
import { useTexture } from "@react-three/drei";

function RotatingSphere() {
  const meshRef = useRef();
  const earthTexture = useTexture("/textures/earth_daymap.jpg");

  // Rotate continuously like Earth
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
      // Log Earth rotation (for learning, comment out later)
      // console.log("🌍 Earth rotation.y:", meshRef.current.rotation.y.toFixed(3));
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial map={earthTexture} />
    </mesh>
  );
}

export default function ThreeScene() {
  const cameraRef = useRef();

  useEffect(() => {
    const handler = (e) => {
      const progress = e.detail; // 0 → 1
      if (cameraRef.current) {
        const newZ = 2 - progress * 1; // zoom effect
        cameraRef.current.position.z = newZ;

        // 🔍 Log for learning
        console.log(
          `📸 Scroll Progress: ${progress.toFixed(2)} → Camera Z: ${newZ.toFixed(2)}`
        );
      }
    };
    window.addEventListener("threeScroll", handler);
    return () => window.removeEventListener("threeScroll", handler);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 3], fov: 75 }}
      onCreated={({ camera }) => (cameraRef.current = camera)}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10,10]} intensity={2}/>

      <pointLight position={[10, 10, 10]} />

      <RotatingSphere />

      <OrbitControls enableZoom={false} enableRotate={false} />
    </Canvas>
  );
}

