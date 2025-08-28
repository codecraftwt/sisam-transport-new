import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

const BoxComponent = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true
    });

    renderer.setClearColor(0x000000);
    renderer.setSize(window.innerWidth, window.innerHeight);

    const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
    const boxMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const box = new THREE.Mesh(boxGeometry, boxMaterial);

    scene.add(box);

    gsap.to(box.position, {
      x: 0,
      y: 0,
      z: 0,
      duration: 1,
      ease: 'power2.inOut'
    });

    gsap.to(camera.position, {
      x: 0,
      y: 0,
      z: 5,
      duration: 1,
      ease: 'power2.inOut'
    });

    camera.lookAt(box.position);

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      // Clean up
      scene.remove(box);
      renderer.dispose();
    };
  }, []);

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default BoxComponent;