import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { useReducedMotion } from "@/lib/motion";

const OLIVE = "#5b6247";
const CHAMPAGNE = "#cbb489";

export const SKILLS = [
  "Next.js",
  "React",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "Laravel",
  "Supabase",
  "PostgreSQL",
  "MongoDB",
  "Express",
  "n8n",
  "OpenAI",
  "Bubble.io",
  "Shopify API",
  "Electron",
  "APIs",
  "Automation",
];

function fibonacciSphere(count: number, radius: number) {
  const points: THREE.Vector3[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = golden * i;
    points.push(
      new THREE.Vector3(Math.cos(theta) * r * radius, y * radius, Math.sin(theta) * r * radius),
    );
  }
  return points;
}

function Constellation({ reduced }: { reduced: boolean }) {
  const group = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  const nodes = useMemo(() => fibonacciSphere(SKILLS.length, 2.5), []);

  const lines = useMemo(() => {
    const positions: number[] = [];
    nodes.forEach((a, i) => {
      const neighbours = nodes
        .map((b, j) => ({ j, d: a.distanceTo(b) }))
        .filter((n) => n.j !== i)
        .sort((m, n) => m.d - n.d)
        .slice(0, 2);
      neighbours.forEach(({ j }) => {
        const b = nodes[j]!;
        positions.push(a.x, a.y, a.z, b.x, b.y, b.z);
      });

    });
    return new Float32Array(positions);
  }, [nodes]);

  useFrame(({ pointer }, delta) => {
    if (!group.current || reduced) return;
    group.current.rotation.y += delta * (hovered === null ? 0.09 : 0.02);
    group.current.rotation.x += (pointer.y * 0.28 - group.current.rotation.x) * 0.03;
  });

  return (
    <group ref={group}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[lines, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={OLIVE} transparent opacity={0.16} />
      </lineSegments>

      {nodes.map((p, i) => (
        <group key={SKILLS[i] ?? i} position={p}>
          <mesh
            onPointerOver={() => setHovered(i)}
            onPointerOut={() => setHovered((h) => (h === i ? null : h))}
          >
            <sphereGeometry args={[hovered === i ? 0.1 : 0.055, 20, 20]} />
            <meshStandardMaterial
              color={hovered === i ? CHAMPAGNE : OLIVE}
              roughness={0.3}
              metalness={0.4}
            />
          </mesh>
          <Html center distanceFactor={9} zIndexRange={[20, 0]}>
            <span
              className="label-mono select-none whitespace-nowrap px-1 transition-colors duration-300"
              style={{
                color: hovered === i ? "var(--ink)" : "var(--muted-foreground)",
                fontWeight: hovered === i ? 700 : 400,
                transform: "translateY(-18px)",
                display: "inline-block",
              }}
            >
              {SKILLS[i]}
            </span>
          </Html>
        </group>
      ))}
    </group>
  );
}

export default function SkillsScene() {
  const reduced = useReducedMotion();
  return (
    <Canvas
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 6.6], fov: 45 }}
    >
      <ambientLight intensity={1.2} />
      <directionalLight position={[3, 4, 5]} intensity={1.1} />
      <Constellation reduced={reduced} />
    </Canvas>
  );
}
