import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
// import ship from "../models/ship.glb"; 
import ship from "../../../assets/GlbModels/ship.glb"; 

function latLngToVector3(lat, lng, radius = 1.22, offset = 0) {
  const phi = THREE.MathUtils.degToRad(90 - lat);
  const theta = THREE.MathUtils.degToRad(lng);
  const r = radius + offset;
  return new THREE.Vector3(
    r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi) - 0.5,
    r * Math.sin(phi) * Math.sin(theta)
  );
}

export default function TravelingShip({ startLat, startLng, endLat, endLng, speed = 0.02 }) {
  const shipRef = useRef();
  const progressRef = useRef(0);

  const gltf = useGLTF(ship);
  const scene = useMemo(() => gltf.scene.clone(), [gltf]);

  const curve = useMemo(() => {
    const startPos = latLngToVector3(startLat, startLng, 1.20, 0.04); 
    const endPos = latLngToVector3(endLat, endLng, 1.10, 0.04);

    const mid = startPos
      .clone()
      .add(endPos)
      .multiplyScalar(0.5) 
      .normalize()
      .multiplyScalar(1.22 + 0.1); 

    return new THREE.QuadraticBezierCurve3(startPos, mid, endPos);
  }, [startLat, startLng, endLat, endLng]);

  useFrame((_, delta) => {
    progressRef.current += delta * speed;
    if (progressRef.current > 1) progressRef.current = 0;

    const position = curve.getPoint(progressRef.current);
    const tangent = curve.getTangent(progressRef.current).normalize();

    shipRef.current.position.copy(position);

    const up = position.clone().normalize();
    const right = new THREE.Vector3().crossVectors(up, tangent).normalize();
    const adjustedUp = new THREE.Vector3().crossVectors(tangent, right).normalize();
    const m = new THREE.Matrix4().makeBasis(right, adjustedUp, tangent);
    shipRef.current.quaternion.setFromRotationMatrix(m);
    shipRef.current.rotateY(Math.PI / 2); 
// shipRef.current.rotateX(-0.9);
// shipRef.current.rotateZ(Math.PI/8);   

  });

  return <primitive ref={shipRef} object={scene} scale={0.004} />;
}
