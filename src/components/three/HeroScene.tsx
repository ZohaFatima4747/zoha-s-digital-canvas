import { useMemo, useRef } from "react";
import { Canvas, useFrame, type ThreeElements } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { useReducedMotion } from "@/lib/motion";

const INK = "#2b2a26";
const OLIVE = "#5b6247";
const CHAMPAGNE = "#d8c39a";

function useLerpedPointer() {
  const state = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  useFrame(({ pointer }) => {
    const s = state.current;
    s.tx = pointer.x;
    s.ty = pointer.y;
    s.x += (s.tx - s.x) * 0.05;
    s.y += (s.ty - s.y) * 0.05;
  });
  return state;
}

function CoreObject({ reduced }: { reduced: boolean }) {
  const outer = useRef<THREE.Mesh>(null);
  const inner = useRef<THREE.Mesh>(null);
  const ring = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (reduced) return;
    if (outer.current) {
      outer.current.rotation.y += delta * 0.12;
      outer.current.rotation.x += delta * 0.04;
    }
    if (inner.current) {
      inner.current.rotation.y -= delta * 0.28;
      inner.current.rotation.z += delta * 0.1;
    }
    if (ring.current) {
      ring.current.rotation.z += delta * 0.06;
      ring.current.rotation.x = Math.PI / 2.6;
    }
  });

  return (
    <group>
      <mesh ref={outer}>
        <icosahedronGeometry args={[1.42, 1]} />
        <meshStandardMaterial
          color={INK}
          wireframe
          transparent
          opacity={0.22}
          roughness={0.6}
        />
      </mesh>
      <mesh ref={inner} castShadow>
        <torusKnotGeometry args={[0.62, 0.19, 220, 32, 2, 3]} />
        <meshPhysicalMaterial
          color={OLIVE}
          roughness={0.24}
          metalness={0.35}
          clearcoat={0.7}
          clearcoatRoughness={0.25}
        />
      </mesh>
      <mesh ref={ring} rotation={[Math.PI / 2.6, 0, 0]}>
        <torusGeometry args={[2.15, 0.008, 8, 160]} />
        <meshBasicMaterial color={CHAMPAGNE} />
      </mesh>
    </group>
  );
}

type ShapeProps = { position: [number, number, number]; kind: number; scale: number };

function Satellite({ position, kind, scale }: ShapeProps) {
  const geometry = useMemo(() => {
    switch (kind % 4) {
      case 0:
        return <octahedronGeometry args={[0.34, 0]} />;
      case 1:
        return <boxGeometry args={[0.36, 0.36, 0.36]} />;
      case 2:
        return <tetrahedronGeometry args={[0.4, 0]} />;
      default:
        return <sphereGeometry args={[0.24, 32, 32]} />;
    }
  }, [kind]);

  return (
    <Float speed={1.1} rotationIntensity={0.7} floatIntensity={1.1}>
      <mesh position={position} scale={scale}>
        {geometry}
        <meshPhysicalMaterial
          color={kind % 2 === 0 ? CHAMPAGNE : INK}
          roughness={kind % 2 === 0 ? 0.2 : 0.5}
          metalness={kind % 2 === 0 ? 0.6 : 0.1}
          transparent
          opacity={kind % 3 === 0 ? 0.85 : 1}
        />
      </mesh>
    </Float>
  );
}

function Particles({ count = 160, reduced }: { count?: number; reduced: boolean }) {
  const points = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 7;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return arr;
  }, [count]);

  useFrame((state, delta) => {
    if (reduced || !points.current) return;
    points.current.rotation.y += delta * 0.02;
    points.current.position.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.12;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.028} color={OLIVE} transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

function Rig({ reduced, children }: { reduced: boolean; children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);
  const pointer = useLerpedPointer();

  useFrame(() => {
    if (!group.current) return;
    if (reduced) return;
    group.current.rotation.y = pointer.current.x * 0.32;
    group.current.rotation.x = pointer.current.y * 0.2;
    group.current.position.x = pointer.current.x * 0.22;
  });

  const props = {} as ThreeElements["group"];
  return (
    <group ref={group} {...props}>
      {children}
    </group>
  );
}

export default function HeroScene() {
  const reduced = useReducedMotion();

  return (
    <Canvas
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 6], fov: 42 }}
      frameloop={reduced ? "demand" : "always"}
    >
      <ambientLight intensity={1.1} />
      <directionalLight position={[4, 6, 5]} intensity={1.5} color="#fffaf0" />
      <directionalLight position={[-5, -2, -3]} intensity={0.5} color={CHAMPAGNE} />
      <Rig reduced={reduced}>
        <CoreObject reduced={reduced} />
        <Satellite position={[-2.75, 1.15, -0.4]} kind={0} scale={1} />
        <Satellite position={[2.65, 0.95, 0.3]} kind={1} scale={0.95} />
        <Satellite position={[-2.35, -1.35, 0.6]} kind={2} scale={1.05} />
        <Satellite position={[2.5, -1.25, -0.5]} kind={3} scale={1.1} />
        <Particles reduced={reduced} />
      </Rig>
    </Canvas>
  );
}
