"use client";
import { Skateboard } from "@/components/skateboard";
import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";

interface Props {
  className?: string;
}

export const InteractiveSkateboard: React.FC<Props> = ({ className }) => {
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
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
};

function Scene() {
  return (
    <group>
      <OrbitControls/>
      <Environment files={'/hdr/warehouse-256.hdr'}/>
  
      <Skateboard />
      <ContactShadows opacity={0.6} position={[0,-.08,0]} />
    </group>
  );
}
