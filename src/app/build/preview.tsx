"use client";

import {
  CameraControls,
  Environment,
  Preload,
  useTexture,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense, useRef } from "react";
import { useCustomizerControls } from "./context";
import { asImageSrc } from "@prismicio/client";
import {
  DEFAULT_BOLT_COLOR,
  DEFAULT_DECK_TEXTURE,
  DEFAULT_TRUCK_COLOR,
  DEFAULT_WHEEL_TEXTURE,
} from "@/slices/Hero";
import { Skateboard } from "@/components/skateboard";
import * as THREE from "three";

const ENV_COLOR = "#3B3A3A";

interface Props {
  wheelTextureUrls: string[];
  deckTextureUrls: string[];
}

export const Preview: React.FC<Props> = ({
  wheelTextureUrls,
  deckTextureUrls,
}) => {
  const cameraControls = useRef<CameraControls>(null);
  const { selectedWheel, selectedBolt, selectedDeck, selectedTruck } =
    useCustomizerControls();

  const wheelTextureUrl =
    asImageSrc(selectedWheel?.texture) ?? DEFAULT_WHEEL_TEXTURE;
  const deckTextureUrl =
    asImageSrc(selectedDeck?.texture) ?? DEFAULT_DECK_TEXTURE;
  const truckColor = selectedTruck?.color ?? DEFAULT_TRUCK_COLOR;
  const boltColor = selectedBolt?.color ?? DEFAULT_BOLT_COLOR;

  return (
    <Canvas>
      <Suspense fallback={"Loading"}>
        <Environment
          files={"/hdr/warehouse-512.hdr"}
          environmentIntensity={0.6}
        />
        <directionalLight
          castShadow
          lookAt={[0, 0, 0]}
          position={[1, 1, 1]}
          intensity={1.6}
        />
        <StageFloor />
        <Skateboard
          deckTextureUrl={deckTextureUrl}
          wheelTextureUrl={wheelTextureUrl}
          truckColor={truckColor}
          boltColor={boltColor}
          wheelTextureUrls={wheelTextureUrls}
          deckTextureUrls={deckTextureUrls}
          pose="side"
        />
        <CameraControls
          ref={cameraControls}
          minDistance={0.2}
          maxDistance={4}
        />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

function StageFloor() {
  const normalMap = useTexture("/concrete-normal.avif");
  normalMap.wrapS = THREE.RepeatWrapping;
  normalMap.wrapT = THREE.RepeatWrapping;
  normalMap.repeat.set(30, 30);
  normalMap.anisotropy = 8;

  const material = new THREE.MeshStandardMaterial({
    roughness: 0.75,
    color: ENV_COLOR,
    normalMap: normalMap,
  });

  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      castShadow
      receiveShadow
      position={[0, -0.005, 0]}
      material={material}
    >
      <circleGeometry args={[20, 32]} />
    </mesh>
  );
}
