import { useRef } from "react";
import { Physics, InstancedRigidBodies } from "@react-three/rapier";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

export default function FloatingObjects() {
  return (
    <Physics gravity={[0, 0, 0]}>
      <Swarm count={50} />
    </Physics>
  );
}

function Swarm({ count }: { count: number }) {
  const instances = useRef<THREE.InstancedMesh>(null);
  
  // Create random initial positions and rotations
  const instancesData = Array.from({ length: count }, () => ({
    position: [
      (Math.random() - 0.5) * 40,
      (Math.random() - 0.5) * 40,
      (Math.random() - 0.5) * 20 - 10,
    ] as [number, number, number],
    rotation: [
      Math.random() * Math.PI,
      Math.random() * Math.PI,
      Math.random() * Math.PI,
    ] as [number, number, number],
  }));

  useFrame(() => {
    if (!instances.current) return;
    // Add subtle floating effect or let rapier gravity handle it
  });

  return (
    <InstancedRigidBodies
      instances={instancesData}
      colliders="ball"
      linearDamping={4}
      angularDamping={1}
    >
      <instancedMesh ref={instances} args={[undefined, undefined, count]} count={count}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#d946ef" emissive="#d946ef" emissiveIntensity={0.8} transparent opacity={0.6} />
      </instancedMesh>
    </InstancedRigidBodies>
  );
}
