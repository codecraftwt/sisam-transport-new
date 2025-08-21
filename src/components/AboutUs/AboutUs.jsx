import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'
import './AboutUs.css'
import AnimatedNumber from "./Numbers";
import AboutUs3D from './AboutUs3D';

gsap.registerPlugin(ScrollTrigger)

const AboutUsSection = () => {
  const sectionRef = useRef(null)
  const [trigger3D, setTrigger3D] = React.useState(false);

useEffect(() => {
  const ctx = gsap.context(() => {
    const tl = gsap.timeline({
      paused: true, 
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "50% 80%",   
        end: "bottom 50%",
        toggleActions: "play none none reverse",
        onEnter: () => setTrigger3D(true),     
        onLeaveBack: () => setTrigger3D(false) ,
        // markers: true,
      }
    });

    tl.fromTo('.aboutus-heading',
      { opacity: 0, x: -60 },
      { opacity: 1, x: 0, duration: 1, ease: 'power3.out' }
    )
    .fromTo('.aboutus-paragraph',
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.15 },
      "-=0.5"
    )
    .fromTo('.aboutus-btn',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      "-=0.3"
    )
    .fromTo('.aboutus-video',
      { opacity: 0, scale: 0.95, x: 60 },
      { opacity: 1, scale: 1, x: 0, duration: 1, ease: 'power3.out' },
      "-=0.4"
    )
    .fromTo('.aboutus-badge',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
      "-=0.5"
    )
    .fromTo('.aboutus-3d',
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 1, ease: 'power3.out' },
      "-=0.6"
    );
  }, sectionRef);

  return () => ctx.revert();
}, []);



  return (
    <section className="aboutus-section" ref={sectionRef}>
      <div className="aboutus-container">
        <div className="aboutus-left">
          <h2 className="aboutus-heading">
            TransMax Sisam<br />
            Around <span className="aboutus-highlight">the World</span>
            <div className="aboutus-underline"></div>
          </h2>
          <p className="aboutus-paragraph">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley text ever since the 1500s, when an unknown printer took a galley
          </p>
          <p className="aboutus-paragraph">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
          </p>
          <button className="aboutus-btn">
            More About US <ArrowRight size={18} style={{ marginLeft: 8 }} />
          </button>
        </div>
        <div className="aboutus-right">
          {trigger3D && (
            <div className="aboutus-3d">
              <AboutUs3D trigger={trigger3D} />
            </div>
          )}
          <div className="aboutus-images">
            <div className="aboutus-img-main">
                <video
                  src="https://videos.pexels.com/video-files/2231802/2231802-uhd_2560_1440_30fps.mp4" 
                  alt="Main Transport"
                  className="aboutus-video"
                  autoPlay
                  muted
                  loop
                  playsInline
                  style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "inherit" }}
                />
            </div>
            <div className="aboutus-img-secondary">
              <video
                src="https://videos.pexels.com/video-files/6618335/6618335-uhd_2560_1440_24fps.mp4" 
                alt="Main Transport"
                className="aboutus-video"
                autoPlay
                muted
                loop
                playsInline
                style={{ width: "300px", height: "100%", objectFit: "cover", borderRadius: "inherit" }}
              />
            </div>
            <div className="aboutus-badge">
              <div className="aboutus-badge-content">
                <AnimatedNumber className="aboutus-badge-number" value={1500} suffix="+" />
                <span className="aboutus-badge-label">Clients Worldwide</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutUsSection