import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useReducedMotion } from "@/lib/motion";

const INK = "#2b2a26";
const OLIVE = "#5b6247";
const CHAMPAGNE = "#d8c39a";

/** Interactive topographic dot-field that ripples away from the pointer. */
function WaveField({ reduced }: { reduced: boolean }) {
  const points = useRef<THREE.Points>(null);
  const COLS = 96;
  const ROWS = 54;
  const GAP = 0.17;

  const { positions, base, colors } = useMemo(() => {
    const count = COLS * ROWS;
    const positions = new Float32Array(count * 3);
    const base = new Float32Array(count * 2);
    const colors = new Float32Array(count * 3);
    const ink = new THREE.Color(INK);
    const olive = new THREE.Color(OLIVE);
    const champagne = new THREE.Color(CHAMPAGNE);
    let i = 0;
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const x = (c - (COLS - 1) / 2) * GAP;
        const y = (r - (ROWS - 1) / 2) * GAP;
        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = 0;
        base[i * 2] = x;
        base[i * 2 + 1] = y;
        const t = (c / COLS + r / ROWS) / 2;
        const col = t < 0.45 ? ink.clone().lerp(olive, t / 0.45) : olive.clone().lerp(champagne, (t - 0.45) / 0.55);
        colors[i * 3] = col.r;
        colors[i * 3 + 1] = col.g;
        colors[i * 3 + 2] = col.b;
        i++;
      }
    }
    return { positions, base, colors };
  }, []);

  const pointer = useRef({ x: 0, y: 0 });

  useFrame(({ clock, pointer: p, viewport }, delta) => {
    const geo = points.current?.geometry;
    if (!geo) return;
    const speed = reduced ? 0.25 : 1;
    const px = (p.x * viewport.width) / 2;
    const py = (p.y * viewport.height) / 2;
    pointer.current.x += (px - pointer.current.x) * Math.min(1, delta * 4);
    pointer.current.y += (py - pointer.current.y) * Math.min(1, delta * 4);

    const t = clock.elapsedTime * speed;
    const arr = geo.attributes["position"]!.array as Float32Array;
    for (let i = 0; i < base.length / 2; i++) {
      const x = base[i * 2]!;
      const y = base[i * 2 + 1]!;
      const wave =
        Math.sin(x * 0.55 + t * 0.6) * 0.32 +
        Math.cos(y * 0.7 - t * 0.45) * 0.24 +
        Math.sin((x + y) * 0.32 + t * 0.9) * 0.16;

      const dx = x - pointer.current.x;
      const dy = y - pointer.current.y;
      const d = Math.sqrt(dx * dx + dy * dy);
      const ripple = reduced ? 0 : Math.cos(Math.min(d, 3.4) * 1.5 - t * 2.2) * Math.exp(-d * 0.55) * 1.15;

      arr[i * 3 + 2] = wave + ripple;
    }
    geo.attributes["position"]!.needsUpdate = true;
    if (points.current) points.current.rotation.z = Math.sin(t * 0.08) * 0.04;
  });

  return (
    <points ref={points} rotation={[-0.62, 0, 0]} position={[0, -0.4, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        vertexColors
        transparent
        opacity={0.75}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/** Thin champagne contour rings drifting above the field. */
function Contours({ reduced }: { reduced: boolean }) {
  const group = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.z += delta * (reduced ? 0.008 : 0.025);
  });
  return (
    <group ref={group} rotation={[-0.62, 0, 0]} position={[0, -0.4, 0.9]}>
      {[2.4, 3.3, 4.4].map((r, i) => (
        <mesh key={r} rotation={[0, 0, i * 0.4]}>
          <torusGeometry args={[r, 0.004, 6, 180]} />
          <meshBasicMaterial color={i === 1 ? OLIVE : CHAMPAGNE} transparent opacity={0.5} />
        </mesh>
      ))}
    </group>
  );
}

export default function HeroScene() {
  const reduced = useReducedMotion();

  return (
    <Canvas
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0.2, 6.2], fov: 46 }}
      frameloop="always"
    >
      <ambientLight intensity={1.1} />
      <WaveField reduced={reduced} />
      <Contours reduced={reduced} />
    </Canvas>
  );
}
