import { Billboard } from "@react-three/drei";
import React, { useRef } from "react";
import * as THREE from "three";

interface Props {
  className?: string;
  position: [number, number, number];
  isVisible: boolean;
  color?: string;
}

export const HotSpot: React.FC<Props> = ({
  position,
  isVisible,
  color = "#E6FC6A",
}) => {
  const hotSpotRef = useRef<THREE.Mesh>(null);

  return (
    <Billboard position={position} follow={true}>
      <mesh ref={hotSpotRef} visible={isVisible}>
        <circleGeometry args={[0.02, 32]}></circleGeometry>
        <meshStandardMaterial color={color} transparent opacity={1} />
      </mesh>

      <mesh
        onPointerOver={() => (document.body.style.cursor = "pointer")}
        onPointerOut={() => (document.body.style.cursor = "default")}

        visible={isVisible}
      >
        <circleGeometry args={[0.03, 32]}></circleGeometry>
        <meshBasicMaterial color={color} />
      </mesh>
    </Billboard>
  );
};
