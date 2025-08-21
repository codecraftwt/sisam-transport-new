import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import truck from "../../../assets/GlbModels/cargotruck.glb"; 

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

export default function TravelingTruck({ startLat, startLng, endLat, endLng, speed = 0.02, arcHeight = 0.05 }) {
  const truckRef = useRef();
  const progressRef = useRef(0);

  const gltf = useGLTF(truck);
  const scene = useMemo(() => gltf.scene.clone(), [gltf]);

  const curve = useMemo(() => {
    const startPos = latLngToVector3(startLat, startLng, 1.22, 0.09); 
    const endPos = latLngToVector3(endLat, endLng, 1.22, 0.09);

    const mid = startPos
      .clone()
      .add(endPos)
      .multiplyScalar(0.7) 
      .normalize()
      .multiplyScalar(1.22 + arcHeight);

    return new THREE.QuadraticBezierCurve3(startPos, mid, endPos);
  }, [startLat, startLng, endLat, endLng, arcHeight]);

  useFrame((_, delta) => {
    progressRef.current += delta * speed;
    if (progressRef.current > 1) progressRef.current = 0;

    const position = curve.getPoint(progressRef.current);
    const tangent = curve.getTangent(progressRef.current).normalize();

    truckRef.current.position.copy(position);

    const up = position.clone().normalize();
    const right = new THREE.Vector3().crossVectors(up, tangent).normalize();
    const adjustedUp = new THREE.Vector3().crossVectors(tangent, right).normalize();
    const m = new THREE.Matrix4().makeBasis(right, adjustedUp, tangent);
    truckRef.current.quaternion.setFromRotationMatrix(m);
    truckRef.current.rotateY(4.7);
  });

  return <primitive ref={truckRef} object={scene} scale={0.0006} />;
}

