import { createClient } from "@/prismicio";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import React from "react";
import { Logo } from "@/components/logo";
import { Bounded } from "./bounded";
import { FooterPhysics } from "./footer-physics";
import { asImageSrc } from "@prismicio/client";

interface Props {
  className?: string;
}

export const Footer: React.FC<Props> = async () => {
  const client = createClient();
  const settings = await client.getSingle("settings");

  const boardTextureUrls = settings.data.footer_skateboards
    .map((item) => asImageSrc(item.skateboard, { h: 600 }))
    .filter((url): url is string => Boolean(url));

  return (
    <footer className="bg-texture bg-zinc-900 text-white ">
      <div className="relative h-[75vh] ~p-10/16 md:aspect-auto">
        <PrismicNextImage
          field={settings.data.footer_image}
          alt=""
          fill
          className="object-cover"
          width={1200}
        />
        <FooterPhysics boardTextureURLs={boardTextureUrls} className="absolute inset-0 overflow-hidden"/>
        <Logo className="pointer-events-none relative h-20 mix-blend-difference" />
      </div>
      <Bounded as="nav">
        <ul className="flex flex-wrap justify-center gap-8 ~text-lg/xl">
          {settings.data.navigation.map((item) => (
            <li key={item.link.text} className="hover:underline">
              <PrismicNextLink field={item.link} />
            </li>
          ))}
        </ul>
      </Bounded>
    </footer>
  );
};
