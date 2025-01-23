"use client";
import * as THREE from "three";
import { Skateboard } from "@/components/skateboard";
import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import { Canvas, ThreeEvent } from "@react-three/fiber";
import React, { Suspense, useRef } from "react";
import gsap from "gsap";

interface Props {
  className?: string;
  deckTextureUrl: string;
  wheelTextureUrl: string;
  truckColor: string;
  boltColor: string;
}

export const InteractiveSkateboard: React.FC<Props> = ({
  deckTextureUrl,
  wheelTextureUrl,
  truckColor,
  boltColor,
}) => {
  return (
    <div className="absolute inset-0 z-10 items-center justify-center">
      <Canvas
        className="min-h-[60rem] w-full"
        camera={{
          position: [1.5, 1, 1.4],
          fov: 55,
        }}
      >
        <Suspense fallback={"Loading"}>
          <Scene
            deckTextureUrl={deckTextureUrl}
            wheelTextureUrl={wheelTextureUrl}
            truckColor={truckColor}
            boltColor={boltColor}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

function Scene({
  deckTextureUrl,
  wheelTextureUrl,
  truckColor,
  boltColor,
}: Props) {
  const containerRef = useRef<THREE.Group>(null);

  function onClick(event: ThreeEvent<MouseEvent>) {
    event.stopPropagation();

    const board = containerRef.current;

    if (!board) {
      return;
    }

    const { name } = event.object;

    gsap
      .timeline()
      .to(board.position, {
        y: 0.8,
        duration: 0.51,
        ease: "power2.out",
        delay: 0.26,
      })
      .to(board.position, { y: 0, duration: 0.43, ease: "power2.in" });

    gsap
      .timeline()
      .to(board.rotation, { x: -0.6, duration: 0.26, ease: "none" })
      .to(board.rotation, { x: 0.4, duration: 0.82, ease: "power2.in" })
      .to(board.rotation, { x: 0, duration: 0.12, ease: "none" })

  }

  return (
    <group>
      <OrbitControls />
      <Environment files={"/hdr/warehouse-256.hdr"} />
      <group ref={containerRef} position={[-.25,0,-.0635]}>
        <group position={[0,-.086,.0635]}>
        <Skateboard
          deckTextureUrl={deckTextureUrl}
          wheelTextureUrl={wheelTextureUrl}
          truckColor={truckColor}
          boltColor={boltColor}
          wheelTextureUrls={[wheelTextureUrl]}
          deckTextureUrls={[deckTextureUrl]}
          constantWheelSpin
        />
        <mesh position={[0, 0.27, 0]} name="middle" onClick={onClick}>
          <boxGeometry args={[0.6, 0.1, 2.2]} />
          <meshStandardMaterial visible={true} />
        </mesh>
      </group>
      </group>
      <ContactShadows opacity={0.6} position={[0, -0.08, 0]} />
    </group>
  );
}
