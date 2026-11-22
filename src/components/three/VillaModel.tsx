import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface VillaModelProps {
  mouse: React.MutableRefObject<[number, number]>;
  scrollProgress: React.MutableRefObject<number>;
  isMobile: boolean;
}

export const VillaModel: React.FC<VillaModelProps> = ({ mouse, scrollProgress, isMobile }) => {
  const groupRef = useRef<THREE.Group>(null);
  const upperFloorRef = useRef<THREE.Group>(null);
  const groundFloorRef = useRef<THREE.Group>(null);
  const interiorLightRef = useRef<THREE.PointLight>(null);
  const poolLightRef = useRef<THREE.PointLight>(null);

  // Materials with enhanced architectural fidelity
  const materials = useMemo(() => {
    return {
      concrete: new THREE.MeshStandardMaterial({
        color: "#EDE9E1",
        roughness: 0.45,
        metalness: 0.08,
      }),
      darkPanel: new THREE.MeshStandardMaterial({
        color: "#121E2A",
        roughness: 0.3,
        metalness: 0.5,
      }),
      teakWood: new THREE.MeshStandardMaterial({
        color: "#9E6436",
        roughness: 0.55,
        metalness: 0.05,
      }),
      glass: new THREE.MeshPhysicalMaterial({
        color: "#DDF0FD",
        transparent: true,
        opacity: 0.5,
        roughness: 0.05,
        metalness: 0.2,
        transmission: 0.75,
        ior: 1.52,
      }),
      balconyGlass: new THREE.MeshPhysicalMaterial({
        color: "#C2E2F7",
        transparent: true,
        opacity: 0.4,
        roughness: 0.05,
        metalness: 0.3,
        transmission: 0.8,
      }),
      plinth: new THREE.MeshStandardMaterial({
        color: "#081523",
        roughness: 0.6,
        metalness: 0.25,
      }),
      goldMetal: new THREE.MeshStandardMaterial({
        color: "#C5A46D",
        metalness: 0.9,
        roughness: 0.2,
      }),
      poolWater: new THREE.MeshStandardMaterial({
        color: "#0B2A3D",
        roughness: 0.04,
        metalness: 0.85,
      }),
      goldLine: new THREE.LineBasicMaterial({
        color: "#C5A46D",
        linewidth: 1.5,
        transparent: true,
        opacity: 0.85,
      }),
    };
  }, []);

  // Geometries memoized
  const geometries = useMemo(() => {
    const plinthBox = new THREE.BoxGeometry(8.8, 0.35, 7.0);
    const groundBox = new THREE.BoxGeometry(4.8, 2.0, 3.8);
    const upperBox = new THREE.BoxGeometry(5.4, 1.7, 4.4);
    const roofBox = new THREE.BoxGeometry(5.8, 0.16, 4.8);

    return {
      plinth: plinthBox,
      plinthEdges: new THREE.EdgesGeometry(plinthBox),
      ground: groundBox,
      groundEdges: new THREE.EdgesGeometry(groundBox),
      upper: upperBox,
      upperEdges: new THREE.EdgesGeometry(upperBox),
      roof: roofBox,
      roofEdges: new THREE.EdgesGeometry(roofBox),
      water: new THREE.BoxGeometry(3.2, 0.08, 2.2),
      glassGround: new THREE.BoxGeometry(3.8, 1.7, 0.06),
      louvers: new THREE.BoxGeometry(0.2, 2.0, 2.2),
      panelUpper: new THREE.BoxGeometry(4.0, 1.5, 0.06),
      glassUpper: new THREE.BoxGeometry(3.4, 1.1, 0.04),
      column: new THREE.CylinderGeometry(0.06, 0.06, 1.6, 16),
      balconyRailing: new THREE.BoxGeometry(3.8, 0.55, 0.04),
      pergolaBeam: new THREE.BoxGeometry(5.6, 0.08, 0.15),
      step: new THREE.BoxGeometry(1.6, 0.1, 0.6),
    };
  }, []);

  // Time accumulator for smooth continuous movement
  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();

    // 1. Continuous smooth orbital showcase rotation + dynamic mouse tilt
    // Beautiful architectural showcase oscillation (smooth sine wave orbit)
    const autoRotY = Math.sin(time * 0.45) * 0.32 + 0.42;
    const targetRotY = autoRotY + (mouse.current[0] * 0.4) + (scrollProgress.current * 0.7);
    const targetRotX = 0.10 + (mouse.current[1] * 0.22) + Math.sin(time * 0.6) * 0.04;

    groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, targetRotY, 3.0, delta);
    groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, targetRotX, 3.0, delta);

    // 2. Elegant vertical breathing float (smooth levitation)
    const floatOffset = Math.sin(time * 1.4) * 0.10;

    // Responsive Base scale & position
    const baseScale = isMobile ? 0.24 : 0.36;
    const currentScale = Math.max(0.18, baseScale * (1 - scrollProgress.current * 0.3));
    groupRef.current.scale.set(currentScale, currentScale, currentScale);

    const targetX = isMobile ? 0 : 2.4;
    const targetY = (isMobile ? -0.85 : -0.25) + floatOffset - (scrollProgress.current * 1.0);

    groupRef.current.position.x = THREE.MathUtils.damp(groupRef.current.position.x, targetX, 3.5, delta);
    groupRef.current.position.y = THREE.MathUtils.damp(groupRef.current.position.y, targetY, 3.5, delta);

    // 3. Subtle floating flex for the cantilever upper floor
    if (upperFloorRef.current) {
      upperFloorRef.current.position.y = 2.65 + Math.sin(time * 1.6 + 1.0) * 0.03;
    }

    // 4. Warm interior light pulsation & pool glow
    if (interiorLightRef.current) {
      interiorLightRef.current.intensity = 3.0 + Math.sin(time * 2.2) * 0.5;
    }
    if (poolLightRef.current) {
      poolLightRef.current.intensity = 1.4 + Math.sin(time * 2.8) * 0.4;
    }
  });

  return (
    <group ref={groupRef} position={[isMobile ? 0 : 2.4, isMobile ? -0.85 : -0.25, 0]}>
      {/* Plinth Base */}
      <mesh geometry={geometries.plinth} material={materials.plinth} position={[0, -0.25, 0]} receiveShadow>
        <lineSegments geometry={geometries.plinthEdges} material={materials.goldLine} />
      </mesh>

      {/* Floating Entrance Stepping Slabs */}
      <mesh geometry={geometries.step} material={materials.concrete} position={[-2.8, -0.15, 2.8]} receiveShadow />
      <mesh geometry={geometries.step} material={materials.concrete} position={[-2.4, -0.05, 2.2]} receiveShadow />
      <mesh geometry={geometries.step} material={materials.concrete} position={[-2.0, 0.05, 1.6]} receiveShadow />

      {/* Illuminated Swimming / Water Terrace */}
      <mesh geometry={geometries.water} material={materials.poolWater} position={[2.2, -0.12, 1.8]} receiveShadow />
      <pointLight
        ref={poolLightRef}
        position={[2.2, 0.2, 1.8]}
        color="#38BDF8"
        intensity={1.2}
        distance={4}
      />

      {/* Ground Floor Main Concrete Volume */}
      <group ref={groundFloorRef}>
        <mesh geometry={geometries.ground} material={materials.concrete} position={[-0.7, 0.95, -0.4]} castShadow receiveShadow>
          <lineSegments geometry={geometries.groundEdges} material={materials.goldLine} />
        </mesh>

        {/* Floor-to-Ceiling Ground Glass Facade */}
        <mesh geometry={geometries.glassGround} material={materials.glass} position={[-0.7, 0.95, 1.52]} />

        {/* Teak Wood Louvers Accent */}
        <mesh geometry={geometries.louvers} material={materials.teakWood} position={[1.7, 0.95, 0.6]} castShadow />
      </group>

      {/* Cantilevered Upper Floor Volume */}
      <group ref={upperFloorRef} position={[0, 2.65, 0]}>
        <mesh geometry={geometries.upper} material={materials.concrete} position={[0.5, 0, 0.2]} castShadow receiveShadow>
          <lineSegments geometry={geometries.upperEdges} material={materials.goldLine} />
        </mesh>

        {/* Upper Floor Accent Panel */}
        <mesh geometry={geometries.panelUpper} material={materials.darkPanel} position={[0.5, 0, 2.32]} />

        {/* Upper Ribbon Glass */}
        <mesh geometry={geometries.glassUpper} material={materials.glass} position={[0.5, 0, 2.36]} />

        {/* Cantilever Glass Balcony Railing */}
        <mesh geometry={geometries.balconyRailing} material={materials.balconyGlass} position={[1.8, -0.4, 2.44]} />

        {/* Roof Parapet Slab */}
        <mesh geometry={geometries.roof} material={materials.plinth} position={[0.5, 0.92, 0.2]}>
          <lineSegments geometry={geometries.roofEdges} material={materials.goldLine} />
        </mesh>

        {/* Architectural Pergola Trellis Beams on Roof */}
        {[-1.2, -0.4, 0.4, 1.2].map((zOffset, i) => (
          <mesh key={i} geometry={geometries.pergolaBeam} material={materials.goldMetal} position={[0.5, 1.15, zOffset]} />
        ))}
      </group>

      {/* Slender Structural Gold Columns under Cantilever */}
      <mesh geometry={geometries.column} material={materials.goldMetal} position={[2.8, 0.8, 2.0]} castShadow />
      <mesh geometry={geometries.column} material={materials.goldMetal} position={[2.8, 0.8, 0.4]} castShadow />

      {/* Warm Glowing Interior Lighting */}
      <pointLight
        ref={interiorLightRef}
        position={[-0.7, 1.2, 0.4]}
        color="#FFE4BD"
        intensity={2.8}
        distance={7}
      />
      <pointLight
        position={[0.7, 2.7, 0.8]}
        color="#FFD49E"
        intensity={2.2}
        distance={6}
      />
    </group>
  );
};
