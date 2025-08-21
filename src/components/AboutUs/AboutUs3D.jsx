import React, { useRef, useEffect, useState, useLayoutEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import aeroplane from '../../assets/GlbModels/aeroplane.glb';
function getSCurvePoints(viewWidth, viewHeight) {
  return [
    new THREE.Vector3(-viewWidth / 1.1 + 0.5,  viewHeight / 1 - 0.5, 0), 
    new THREE.Vector3(viewWidth / 2,        viewHeight /3,     0),
    new THREE.Vector3(-viewWidth /10,         viewHeight / 14,      0), 
    new THREE.Vector3(viewWidth / 1 - 0.5,  -viewHeight / 1 + 0.05, 0), 
  ];
}

function PlaneModel({ progress, curve, scale: modelScale }) {
  const ref = useRef();
  // const { scene } = useGLTF(require('../../assets/GlbModels/aeroplane.glb'));
  const { scene } = useGLTF(aeroplane);
  const propeller = scene.getObjectByName('propeller') || scene.getObjectByName('Propeller');

  const FIXED_ROTATION = [0, Math.PI , 0];

  const hasSpunRef = useRef(false);
  const spinStartT = 1 / 3; 
  const spinThreshold = 0.005; 
  const spinProgress = useRef(0);
  const isSpinning = useRef(false);

  useFrame((state) => {
    if (ref.current && curve) {
      const t = progress.current;
      const pos = curve.getPoint(t);
      const tangent = curve.getTangent(t);
      ref.current.position.copy(pos);
      
      const lookAt = pos.clone().add(tangent);
      ref.current.lookAt(lookAt);
      
      const roll = -tangent.x * 1.2;
      ref.current.rotation.z += roll;
      
      const turbulence = Math.sin(state.clock.getElapsedTime() * 2 + t * 10) * 0.02;
      ref.current.position.y += turbulence;
      
      if (propeller) {
        propeller.rotation.z += 0.5 + Math.abs(Math.sin(state.clock.getElapsedTime() * 3)) * 0.2;
      }
      
      if (!hasSpunRef.current && Math.abs(t - spinStartT) < spinThreshold) {
        hasSpunRef.current = true;
        isSpinning.current = true;
        spinProgress.current = 0;
      }
      
      if (isSpinning.current) {
        spinProgress.current += 0.007; 
        if (spinProgress.current >= 1) {
          isSpinning.current = false;
        } else {
          ref.current.rotation.x += 0.2; 
        }
      }
      
      if (hasSpunRef.current && t > spinStartT + spinThreshold && !isSpinning.current) {
        hasSpunRef.current = false;
      }
    }
  });

  return <primitive ref={ref} object={scene} scale={modelScale} rotation={FIXED_ROTATION} />;
}

function PathLine({ curve }) {
  if (!curve) return null;
  const points = curve.getPoints(100);
  return (
    <line>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attach="attributes-position"
          count={points.length}
          array={new Float32Array(points.flatMap(p => [p.x, p.y, p.z]))}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial attach="material" color="red" linewidth={4} />
    </line>
  );
}

export default function AboutUs3D({ trigger }) {
  const progress = useRef(0);
  const animRef = useRef();
  const gsapObj = useRef({ value: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [curve, setCurve] = useState(null);

  useLayoutEffect(() => {
    function updateSize() {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    }
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    if (dimensions.width && dimensions.height) {
      const aspect = dimensions.width / dimensions.height;
      const viewWidth = 4 * aspect;
      const viewHeight = 4;
      const points = getSCurvePoints(viewWidth, viewHeight);
      setCurve(new THREE.CatmullRomCurve3(points));
    }
  }, [dimensions]);

  const planeScale = useMemo(() => {
    if (!dimensions.width) return 0.028;
    if (dimensions.width <= 476) return 0.012;
    if (dimensions.width <= 770) return 0.022;
    return 0.028;
  }, [dimensions.width]);

  useEffect(() => {
    if (trigger) {
      gsapObj.current.value = 0;
      animRef.current = gsap.to(gsapObj.current, {
        value: 1,
        duration: 20,
        ease: 'power2.inOut',
        // markers:true,
        start:" 10% 20%",
        end: "15% 40%",
        onUpdate: () => {
          progress.current = gsapObj.current.value;
        },
      });
    } else {
      if (animRef.current) animRef.current.kill();
      gsapObj.current.value = 0;
      progress.current = 0;
    }
    return () => animRef.current && animRef.current.kill();
  }, [trigger]);

  return (
    <div style={{ 
      position: 'fixed', 
      inset: 0, 
      width: '100vw', 
      height: '100vh', 
      pointerEvents: 'none', 
      zIndex: -5,
      opacity: trigger ? 1 : 0,
      transition: 'opacity 0.5s ease-in-out'
    }}>
      {curve && trigger && (
        <Canvas camera={{ position: [0, 0, 7], fov: 50 }} style={{ width: '100vw', height: '100vh' }}>
          <ambientLight intensity={2} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          {/* <PathLine curve={curve} /> */}
          <PlaneModel progress={progress} curve={curve} scale={planeScale} />
        </Canvas>
      )}
    </div>
  );
}