import {
  ContactShadows,
  Environment,
  Float,
  Cloud,
  Sky,
  OrbitControls,
} from "@react-three/drei";
import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Water } from "three-stdlib";

gsap.registerPlugin(ScrollTrigger);

//
// --- Ocean Component ---
function Ocean() {
  const waterRef = useRef();
  const { scene } = useThree();

  const waterNormalsUrl = "https://threejs.org/examples/textures/waternormals.jpg";
  const waterNormals = useLoader(THREE.TextureLoader, waterNormalsUrl);
  waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;

  const sunDirection = useMemo(() => new THREE.Vector3(1, 1, 1).normalize(), []);
  const geom = useMemo(() => new THREE.PlaneGeometry(10000, 10000, 512, 512), []);

  const water = useMemo(
    () =>
      new Water(geom, {
        textureWidth: 1024,
        textureHeight: 1024,
        waterNormals,
        sunDirection,
        sunColor: new THREE.Color("#ff8c00"),
        waterColor: new THREE.Color("#0666c6"),
        distortionScale: 100,
        fog: scene.fog !== undefined,
        format: THREE.RGBAFormat,
      }),
    [geom, scene.fog, sunDirection, waterNormals]
  );

  useFrame((_, delta) => {
    if (water.material?.uniforms?.time) {
      water.material.uniforms.time.value += delta * 1;
    }
  });

  return (
    <primitive
      ref={waterRef}
      object={water}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, 3, 0]}
    />
  );
}

//
// --- Animated Ship ---
function AnimatedShip({ model }) {
  const shipRef = useRef();

  useFrame(({ clock }) => {
    if (shipRef.current) {
      shipRef.current.position.z = Math.sin(clock.getElapsedTime()) * 2;
      shipRef.current.position.y = Math.sin(clock.getElapsedTime()) * 1;
    }
  });

  if (!model) return null;

  return (
    <primitive
      ref={shipRef}
      object={model}
      position={[-60, 3, -32]}
      scale={[1.5, 1.5, 1.5]}
    />
  );
}

//
// --- Flying Birds ---
function FlyingBirds({ model }) {
  const birdsRef = useRef();
  const mixerRef = useRef();
  const clockRef = useRef(new THREE.Clock());

  useEffect(() => {
    if (!model) return;
    mixerRef.current = new THREE.AnimationMixer(model.scene);
    if (model.animations && model.animations.length > 0) {
      model.animations.forEach((clip) => {
        mixerRef.current.clipAction(clip).play();
      });
    }
  }, [model]);

  useFrame(({ clock }) => {
    if (birdsRef.current) {
      birdsRef.current.position.z = -clock.getElapsedTime() * 3;
      birdsRef.current.position.y = 53 + Math.sin(clock.getElapsedTime()) * 1;
    }
    if (mixerRef.current) {
      mixerRef.current.update(clockRef.current.getDelta());
    }
  });

  if (!model) return null;

  return (
    <primitive
      ref={birdsRef}
      object={model.scene}
      position={[10, 53, -2]}
      scale={[5, 5, 5]}
    />
  );
}

//
// --- Main Section ---
function ShipSectipn() {
  const [model, setModel] = useState(null);
  const [bird, setBird] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const titleRef = useRef(null);
  const cloudref =useRef(null);
  const cloudrefsecond =useRef(null);

  useEffect(() => {
    if (!isVisible) return;
    const letters = titleRef.current.querySelectorAll(".letter");
    gsap.from(letters, {
      y: 100,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      stagger: 0.1,
      delay: 2,
    });
  }, [isVisible]);

  const text = "SISAM";

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load("/models/ship/scene.gltf", (gltf) => {
      setModel(gltf.scene);
    });
    loader.load("/models/flyingBirds/scene.gltf", (gltf) => {
      setBird({ scene: gltf.scene, animations: gltf.animations });
    });

    setTimeout(() => setIsVisible(true), 500);
  }, []);
   useEffect(() => {
    if (!model || !cloudref.current) return;
    gsap.to(model.position, {
      x: 20,
      z: 3,
      duration: 6,
      yoyo: true,
      scrollTrigger: {
        start: "top -650%",
         end: "top -900%",
        scrub: 2,
        markers: true,
        pin: true,
      },
    });
    gsap.to(cloudref.current.position, {
      y: 30,
      duration: 6,
      yoyo: true,
      scrollTrigger: {
        start: "top top",
       end: "top bottom",
        scrub: 2,
        pin: true,
        markers: true,
      },
    });
    gsap.to(cloudrefsecond.current.position, {
      y: 30,
      duration: 8,
      yoyo: true,
      scrollTrigger: {
        start: "top top",
       end: "top top",
        scrub: 2,
        pin: true,
        markers: true,
      },
    });
  }, [model, cloudref.current, cloudrefsecond.current]);


  if (!isVisible) return null;

  return (
    <div className="relative w-full h-[100vh]">
      <Canvas
        style={{ height: "100vh", width: "100vw" }}
        camera={{ position: [-50, 20, 100], fov: 45, near: 0.1, far: 2000 }}
        shadows
        gl={{ antialias: true, alpha: true }}
      >
        <Sky
          distance={450000}
          turbidity={10}
          rayleigh={15}
          mieCoefficient={0.005}
          mieDirectionalG={0.8}
          inclination={0.49}
          azimuth={0.25}
          sunPosition={[4, 0.005, -10]}
        />

        {/* Lighting */}
        <ambientLight intensity={4.4} color="white" />
        <directionalLight position={[10, 10, 5]} intensity={5}  color="white" />
        <pointLight position={[-5, 5, -5]} intensity={5} color="white" />
        <Environment preset="warehouse" />

        {/* <Environment preset="warehouse" /> */}
        {/* <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={20} blur={2} far={20} /> */}

        <Suspense fallback={null}>
          <group rotation={[0, -(135 * Math.PI) / 180, 0]} position={[0, -20, 0]}>
            {/* ✅ Lightweight drei Clouds */}
            {/* <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.1}>
              <Cloud opacity={0.5} speed={0.2} width={100} depth={20} segments={30} position={[140, 0, 100]} />
            </Float> */}
            <Float speed={0.00001} rotationIntensity={0.00001} floatIntensity={0.000001}>
                  <Cloud
                  opacity={0.5}
                  width={80} 
                  ref={cloudrefsecond}
                  depth={10}
                  segments={20}
                  position={[102, 22, -33]}
                  rotation={[0, (100 * Math.PI) / 180, 0]}
                  color="white"  // ✅ correct way
                   seed={42} 
                />
            </Float>
            <Float speed={0.00001} rotationIntensity={0.00001} floatIntensity={0.000001}>
                  <Cloud
                   ref={cloudref}
                  opacity={3}
                  width={80}
                  depth={10}
                  segments={20}
                  position={[102, 23.3, -33]}
                  rotation={[0, (100 * Math.PI) / 180, 0]}
                 color="#ffffff"  // ✅ correct way
                   seed={42} 
                />
            </Float>

            {/* Ship */}
            <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.1}>
              <AnimatedShip model={model} />
            </Float>

            {/* Birds */}
            <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.1} position={[0, 0, 100]}>
              <FlyingBirds model={bird} />
            </Float>

            {/* Ocean */}
            <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.1}>
              <Ocean />
            </Float>
          </group>
        </Suspense>

        <OrbitControls
          enablePan={false}
          enableZoom={false}
          autoRotateSpeed={0.5}
          enableRotate={false}
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>

      {/* Overlay text */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "20%",
          transform: "translate(-50%, -50%)",
          zIndex: 10,
          color: "white",
          fontSize: "2rem",
          textAlign: "center",
        }}
      >
        <h1 ref={titleRef} style={{ color: "#212121", fontSize: "52px", fontWeight: "bold" }} className="title">
          {text.split("").map((letter, i) => (
            <span key={i} className="letter inline-block">
              {letter}
            </span>
          ))}
        </h1>
      </div>
    </div>
  );
}

export default ShipSectipn;
