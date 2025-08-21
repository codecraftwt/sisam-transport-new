import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html, useGLTF } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function GlassCard({ title, subtitle, buttonLabel, position, children, description }) {
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calculate responsive card dimensions
  const getCardDimensions = (width) => {
    if (width >= 1200) {
      return { width: "300px", height: "400px", fontSize: "35px", subtitleSize: "12px" };
    } else if (width >= 768) {
      return { width: "280px", height: "360px", fontSize: "30px", subtitleSize: "11px" };
    } else {
      return { width: "20px", height: "30px", fontSize: "32px", subtitleSize: "12px" };
    }
  };

  const cardDimensions = getCardDimensions(screenSize.width);

  const gradients = {
    Train: "linear-gradient(135deg, rgba(0, 210, 255, 0.1) 0%, rgba(58, 71, 213, 0.1) 100%)",
    Cargo: "linear-gradient(135deg, rgba(255, 0, 150, 0.1) 0%, rgba(255, 154, 0, 0.1) 100%)",
    Marine: "linear-gradient(135deg, rgba(0, 255, 200, 0.1) 0%, rgba(0, 120, 255, 0.1) 100%)",
    Flight: "linear-gradient(135deg, rgba(255, 230, 100, 0.1) 0%, rgba(150, 50, 50, 0.1) 100%)",
  };

  return (
    <group position={position}>
      <Html
        position={[0, 0, 0.6]}
        transform
        zIndexRange={[0, 50]}
        style={{
          width: cardDimensions.width,
          height: cardDimensions.height,
          borderRadius: "20px",
          background:
            gradients[title] ||
            "linear-gradient(135deg, rgba(0, 210, 255, 0.2) 0%, rgba(58, 71, 213, 0.2) 100%)",
          backdropFilter: "blur(50px)",
          border: "4px solid rgba(255, 255, 255, 0.5)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "16px",
          color: "#212121",
          fontFamily: "sans-serif",
          zIndex: 0,
        }}
      >
        {/* Top Text */}
        <div onClick={() => alert(`You clicked on ${title}`)}>
          <h2 style={{ margin: 0, fontSize: cardDimensions.fontSize, fontWeight: "bold", color: "#212121" }}>
            {title}
          </h2>
          <p
            style={{
              margin: "4px 0",
              fontSize: cardDimensions.subtitleSize,
              opacity: 0.8,
              fontWeight: "bold",
              color: "#212121",
            }}
          >
            {subtitle}
          </p>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div
            style={{
              color: "#212121",
              width: "70%",
              fontSize: screenSize.width >= 768 ? "14px" : "13px",
            }}
          >
            {description || "Description"}
          </div>
          {/* Button */}
          <div
            style={{
              alignSelf: "flex-end",
              padding: screenSize.width >= 768 ? "6px 12px" : "5px 10px",
              borderRadius: "12px",
              background: "rgba(255, 255, 255, 0.3)",
              fontSize: screenSize.width >= 768 ? "12px" : "11px",
              cursor: "pointer",
              color: "#212121",
              width: screenSize.width >= 768 ? "50px" : "45px",
              textAlign: "center",
            }}
          >
            {buttonLabel}
          </div>
        </div>
      </Html>
      {children}
    </group>
  );
}

// Main Scene
export default function Cards() {
  const [train, settrain] = useState(null);
  const [truck, settruck] = useState(null);
  const [ship, setship] = useState(null);
  const [airplane, setairplane] = useState(null);
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });
  const [cardPositions, setCardPositions] = useState([]);

  // Truck Model
  function TruckModel(props) {
    const { scene } = useGLTF("/models/truckTest/scene.gltf");

    useEffect(() => {
      settruck(scene);
    }, [scene]);

    return (
      <primitive
        object={scene}
        scale={0.45}
        {...props}
        rotation={[(40 * Math.PI) / 180, (60 * Math.PI) / 180, (-20 * Math.PI) / 180]}
      />
    );
  }

  // Train Model
  function TrainModel(props) {
    const { scene } = useGLTF("/models/Train/scene.gltf");

    useEffect(() => {
      settrain(scene);
    }, [scene]);

    return (
      <primitive
        object={scene}
        zIndex={10}
        scale={0.11}
        rotation={[(40 * Math.PI) / 180, (60 * Math.PI) / 180, (-20 * Math.PI) / 180]}
        {...props}
      />
    );
  }

  // Ship Model
  function ShipModel(props) {
    const { scene } = useGLTF("/models/ship/scene.gltf");

    useEffect(() => {
      setship(scene);
    }, [scene]);

    return (
      <primitive
        object={scene}
        scale={0.09}
        {...props}
        position={[-1.2, 0, 0]}
        rotation={[(40 * Math.PI) / 180, (-50 * Math.PI) / 180, (10 * Math.PI) / 180]}
      />
    );
  }

  // Airplane Model
  function AirplaneModel(props) {
    const { scene } = useGLTF("/models/Air/scene.gltf");

    useEffect(() => {
      setairplane(scene);
    }, [scene]);

    return (
      <primitive
        object={scene}
        scale={0.2}
        {...props}
        rotation={[(40 * Math.PI) / 180, (40 * Math.PI) / 180, (10 * Math.PI) / 180]}
      />
    );
  }

  // Calculate responsive positions
  const calculateCardPositions = (width) => {
    if (width >= 1025) {
      return [
        [-13.5, 0, 0], // Train
        [-4.5, 0, 0], // Truck
        [4.5, 0, 0], // Ship
        [13.5, 0, 0], // Airplane
      ];
    } else if (width >= 800) {
      return [
        [-13, 3, 0], // Train
        [-4.4, 3, 0], // Truck
        [4.25, 3, 0], // Ship
        [12.9, 3, 0], // Airplane
      ];
    } else if (width >= 768) {
      return [
        [-4.5, 3, 0], // Train
        [4.5, 3, 0], // Truck
        [-4.5, -7.5, 0], // Ship
        [4.5, -7.5, 0], // Airplane
      ];
    } else {
      return [
        [0, 5, 0], // Train
        [0, -6, 0], // Truck
        [0, -17, 0], // Ship
        [0, -12, 0], // Airplane
      ];
    }
  };

  // const getSectionHeight = (width) => {
  //   if (width >1200 && width <= 1430) return "100vh";
  //   if (width >= 768 && width <= 1200) return "100vh";
  //   if (width >= 320 && width <= 425) return "100vh";
  //   return "100vh";
  // };

  // Canvas height
  const getCanvasHeight = (width) => {
    if (width >= 1431 ) return "70vh";
    if (width >= 769 && width <= 1430) return "65vh";
    if (width >= 320 && width <= 425) return "100vh";
    return "100vh";
  };

  // Get camera position
  const getCameraPosition = (width) => {
    if (width >= 1200 && width <= 1430) return [0, 0, 18];
    if (width >= 769 && width <= 1199) return [0, 0, 26];
    return [0, 0, 22];
  };

  // Track screen size
  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Update card positions when screen size changes
  useEffect(() => {
    setCardPositions(calculateCardPositions(screenSize.width));
  }, [screenSize.width]);

  // GSAP Animations
  useEffect(() => {
    if (!train || !truck || !ship || !airplane || cardPositions.length === 0) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".cards-section",
        start: "top 20%",
        markers: false,
      },
    });

    // Train
    tl.from(train.position, { z: 0, x: -0.5, y: 1, duration: 3, ease: "power2.out" })
      .from(train.scale, { x: 0.1, y: 0.1, z: 0.1, duration: 3 }, "<")
      .from(train.rotation, { x: 0, y: (80 * Math.PI) / 180, z: 0, duration: 3 }, "<");

    // Truck
    tl.from(truck.position, { z: 0, x: -0.1, y: 1, duration: 3, ease: "power2.out" }, ">-1")
      .from(truck.scale, { x: 0.7, y: 0.7, z: 0.7, duration: 3 }, "<")
      .from(truck.rotation, { x: (2 * Math.PI) / 180, y: (10 * Math.PI) / 180, z: 0.001, duration: 3 }, "<");

    // Ship
    tl.from(ship.position, { z: 0, x: -0.5, y: 0, duration: 3, ease: "power2.out" }, ">-1")
      .from(ship.scale, { x: 0.12, y: 0.12, z: 0.12, duration: 3 }, "<")
      .from(ship.rotation, { x: 0.1, y: (-90 * Math.PI) / 180, z: 0.001, duration: 3 }, "<");

    // Airplane
    tl.from(airplane.scale, { x: 0.15, y: 0.15, z: 0.15, duration: 3 }, ">-1")
      .from(airplane.rotation, { x: 0, y: 0, z: 0, duration: 3 }, "<");
  }, [train, truck, ship, airplane, cardPositions]);

  return (
    <div
      className="cards-section"
      style={{
        minHeight: "100vh",
        width: "100vw",
        background:
          "linear-gradient(135deg, #ff9a9e, #fad0c4, #fad0c4, #fbc2eb, #a1c4fd)",
        backgroundSize: "400% 400%",
        animation: "gradientMove 15s ease infinite",
        paddingTop: "2rem",
        paddingBottom: "2rem",
      }}
    >
      {/* Header Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          flexWrap: "wrap",
          padding: "0 2rem",
          marginBottom: "2rem",
          gap: "2rem",
        }}
      >
        <div style={{ flex: "1", minWidth: "300px" }}>
          <h2
            style={{
              fontWeight: 600,
              fontSize: screenSize.width >= 768 ? 48 : 32,
              marginBottom: 8,
              letterSpacing: "-0.02em",
              textAlign: screenSize.width < 768 ? "center" : "left",
            }}
          >
            Explore Our <span style={{ color: "#FFC107" }}>Services</span>
          </h2>
          <div
            style={{
              maxWidth: 570,
              fontSize: screenSize.width >= 768 ? 16 : 14,
              lineHeight: 1.7,
              opacity: 0.9,
              textAlign: screenSize.width < 768 ? "center" : "left",
              margin: screenSize.width < 768 ? "0 auto" : "0",
            }}
          >
            Transmax is the world's driving worldwide coordinations supplier — we
            uphold industry and exchange the worldwide trade of merchandise
            through land transport.
          </div>
        </div>

        <button
          style={{
            padding: "11px 28px",
            backgroundColor: "#0A3A75",
            color: "#fff",
            border: "none",
            borderRadius: 7,
            fontWeight: 700,
            letterSpacing: 0.01,
            cursor: "pointer",
            transition: "background 0.18s",
            height: "38px",
            width: "150px",
            fontSize: "14px",
            alignSelf: screenSize.width < 768 ? "center" : "flex-start",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#0d4785")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#0A3A75")}
        >
          Explore More
        </button>
      </div>

      {/* 3D Canvas */}
      <Canvas
        camera={{
          position: getCameraPosition(screenSize.width),
          fov: screenSize.width >= 768 ? 45 : 50,
        }}
        style={{
          height:getCanvasHeight(screenSize.width),
          zIndex: 5,
          overflowY: "auto"
        }}
      >
        <ambientLight intensity={2.2} />
        <hemisphereLight skyColor={"#ffffff"} groundColor={"#cccccc"} intensity={1.5} />
        <directionalLight position={[0, 0, 10]} intensity={7.5} castShadow />

        {cardPositions.length > 0 && (
          <>
            <GlassCard
              title="Train"
              subtitle="Rail Transport"
              buttonLabel="Credit"
              description="With a worldwide organization and progressed coordination arrangements, our airship cargo sending items."
              position={cardPositions[0]}
            >
              <TrainModel position={[-0.5, 0, 0]} />
            </GlassCard>

            <GlassCard
              title="Cargo"
              subtitle="Truck Transport"
              buttonLabel="Credit"
              description="With a worldwide organization and progressed coordination arrangements, our airship cargo sending items."
              position={cardPositions[1]}
            >
              <TruckModel position={[-0.2, 0, 0]} />
            </GlassCard>

            <GlassCard
              title="Marine"
              subtitle="Ship Transport"
              buttonLabel="Credit"
              description="With a worldwide organization and progressed coordination arrangements, our airship cargo sending items."
              position={cardPositions[2]}
            >
              <ShipModel position={[0, -0.5, 0]} />
            </GlassCard>

            <GlassCard
              title="Flight"
              subtitle="Air Transport"
              buttonLabel="Credit"
              description="With a worldwide organization and progressed coordination arrangements, our airship cargo sending items."
              position={cardPositions[3]}
            >
              <AirplaneModel position={[0, -0.5, 0]} />
            </GlassCard>
          </>
        )}
      </Canvas>

      <style>{`
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}
