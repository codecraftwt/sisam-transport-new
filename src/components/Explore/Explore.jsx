import React, { useRef } from "react";
import gsap from "gsap";
import ExploreBg from "./../../assets/explorebg.jpg";
import Land from "./../../assets/Land.mp4";
import Air from "./../../assets/Air.mp4";
import Water from "./../../assets/Water.mp4";

// Example logos (replace with your PNG files)
import LandLogo from "./../../assets/road.png";
import AirLogo from "./../../assets/air.png";
import WaterLogo from "./../../assets/water.png";

const cards = [
  {
    logo: LandLogo,
    title: "Land Transport",
    description:
      "With a worldwide organization and progressed coordination arrangements, our airship cargo sending items.",
    points: ["Part & Full Loads", "Multimodal Solutions", "Intermodal Solutions"],
    accent: "#FFBC00",
    video: Land,
  },
  {
    logo: AirLogo,
    title: "Air Freight",
    description:
      "We help transport your load anyplace on the planet, making your business run easily regardless of where products.",
    points: ["General Air Freight Products", "Charter Services", "Intermodal Solutions"],
    accent: "#1D6FFA",
    video: Air,
  },
  {
    logo: WaterLogo,
    title: "Ocean Freight",
    description:
      "Sea cargo dispatches in excess of 5,500 holders per day to ports all around the globe, making us a top forwarder.",
    points: ["Less-than-container Load", "Full Container Load", "Intermodal Solutions"],
    accent: "#00B8D4",
    video: Water,
  },
];

export default function ServiceCardsWithHeader() {
  const cardRefs = useRef([]);
  const timers = useRef({}); // store timers per card

  const flipCard = (idx, toBack) => {
    const card = cardRefs.current[idx];
    if (!card) return;
    gsap.to(card, {
      rotateY: toBack ? 180 : 0,
      duration: 0.7,
      ease: "power2.inOut",
    });
  };

  const handleMouseEnter = (idx) => {
    clearTimeout(timers.current[idx]); // clear any pending timer
    flipCard(idx, true); // flip to back immediately
  };

  const handleMouseLeave = (idx) => {
    // wait 2.5s before flipping back
    timers.current[idx] = setTimeout(() => {
      flipCard(idx, false);
    }, 500);
  };

  return (
    <div style={{ position: "relative", width: "100%", minHeight: 350 }}>
      {/* Background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${ExploreBg})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          filter: "blur(8px) brightness(1.4)",
          zIndex: -2,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.3)",
          zIndex: -1,
        }}
      />

      <div style={{ position: "relative", paddingBottom: 40 }}>
        {/* Header */}
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "32px 24px 12px",
            textAlign: "left",
            marginTop: 20,
            color: "#fff",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <div>
              <h2
                style={{
                  fontWeight: 600,
                  fontSize: 48,
                  marginBottom: 8,
                  letterSpacing: "-0.02em",
                }}
              >
                Explore Our <span style={{ color: "#FFC107" }}>Services</span>
              </h2>
              <div
                style={{
                  maxWidth: 570,
                  fontSize: 16,
                  lineHeight: 1.7,
                  opacity: 0.9,
                }}
              >
                Transmax is the world’s driving worldwide coordinations supplier —
                we uphold industry and exchange the worldwide trade of merchandise
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
                fontSize: 16,
                letterSpacing: 0.01,
                cursor: "pointer",
                transition: "background 0.18s",
                marginTop: 12,
                marginBottom: 4,
              }}
            >
              Explore More
            </button>
          </div>
        </div>

        {/* Cards */}
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: 80,
            marginBottom: 60,
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 40,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {cards.map((card, idx) => (
              <div
                key={card.title}
                style={{
                  perspective: "1000px",
                  width: 320,
                  height: 360,
                }}
                onMouseEnter={() => handleMouseEnter(idx)}
                onMouseLeave={() => handleMouseLeave(idx)}
              >
                <div
                  ref={(el) => (cardRefs.current[idx] = el)}
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    borderRadius: 18,
                    transformStyle: "preserve-3d",
                    boxShadow:
                      "2px 4px 12px rgba(0,0,0,0.2), 0 2px 6px rgba(0,0,0,0.1)",
                  }}
                >
                  {/* Front Side */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: 18,
                      overflow: "hidden",
                      backfaceVisibility: "hidden",
                      transform: "rotateY(0deg)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "#fff",
                      transformStyle: "preserve-3d",
                    }}
                  >
                    <video
                      autoPlay
                      loop
                      muted
                      style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        zIndex: -2,
                      }}
                    >
                      <source src={card.video} type="video/mp4" />
                    </video>
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        backgroundColor: "rgba(0,0,0,0.45)",
                        zIndex: -1,
                      }}
                    />
                    {/* Floating Logo */}
                    <img
                      src={card.logo}
                      alt={card.title}
                      style={{
                        width: 70,
                        height: 70,
                        marginBottom: 18,
                        transform: "translateZ(40px)",
                      }}
                    />
                    {/* Floating Title */}
                    <h3
                      style={{
                        fontSize: 22,
                        fontWeight: 700,
                        transform: "translateZ(40px)",
                        textShadow: "0 4px 12px rgba(0,0,0,0.6)",
                      }}
                    >
                      {card.title}
                    </h3>
                  </div>

                  {/* Back Side */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: 18,
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                      backgroundColor: "rgba(0,0,0,0.7)",
                      padding: "24px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      color: "#fff",
                    }}
                  >
                    <div style={{ fontSize: 14.5, marginBottom: 12 }}>
                      {card.description}
                    </div>
                    <ul
                      style={{
                        listStyle: "none",
                        padding: 0,
                        margin: 0,
                        fontSize: 13.5,
                        color: "#ddd",
                      }}
                    >
                      {card.points.map((pt, pi) => (
                        <li
                          key={pi}
                          style={{
                            marginBottom: 6,
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <span
                            style={{
                              color: card.accent,
                              fontWeight: 900,
                              marginRight: 8,
                            }}
                          >
                            •
                          </span>
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
