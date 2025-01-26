"use client";

import { useProgress } from "@react-three/drei";
import clsx from "clsx";
import { Logo } from "./logo";

export const Loading = () => {
  const { progress } = useProgress();

  return (
    <div
      className={clsx(
        "absolute inset-0 grid place-content-center bg-brand-navy font-sans text-[15vw] text-white transition-opacity duration-1000",
        progress >= 10 ? "pointer-events-none opacity-0" : "opacity-100"
      )}
    >
      <Logo className="w-[15vw] animate-squiggle text-brand-pink" />

      <p className="uppecase w-full animate-squiggle content-center leading-none text-brand-lime">
        Loading...
      </p>
    </div>
  );
};
