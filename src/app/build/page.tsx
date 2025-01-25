import { ButtonLink } from "@/components/button-link";
import { Heading } from "@/components/heading";
import { Logo } from "@/components/logo";
import clsx from "clsx";
import Link from "next/link";
import { CustomizerControlsProvider } from "./context";
import { createClient } from "@/prismicio";
import { Preview } from "./preview";
import { asImageSrc } from "@prismicio/client";

interface Props {
  className?: string;
}

export default async function Page({ className }: Props) {
  const client = createClient();
  const customizerSettings = await client.getSingle("board_customizer");
  const { wheels, metals, decks } = customizerSettings.data;

  const defaultWheel = wheels[0];
  const defaultDeck = decks[0];
  const defaultTruck = metals[0];
  const defaultBolt = metals[0];

  const wheelTextureUrls = wheels
    .map((texture) => asImageSrc(texture.texture))
    .filter((url): url is string => Boolean(url));

  const deckTextureUrls = decks
    .map((texture) => asImageSrc(texture.texture))
    .filter((url): url is string => Boolean(url));

  return (
    <div className={clsx("flex min-h-screen flex-col lg:flex-row", className)}>
      <CustomizerControlsProvider
        defaultBolt={defaultBolt}
        defaultDeck={defaultDeck}
        defaultTruck={defaultTruck}
        defaultWheel={defaultWheel}
      >
        <div className="relative aspect-square shrink-0 bg-[#3a414a] lg:aspect-auto lg:grow">
          <div className="absolute inset-0">
            <Preview
              deckTextureUrls={deckTextureUrls}
              wheelTextureUrls={wheelTextureUrls}
            />
          </div>
          <Link href={"/"} className="absolute left-6 top-6">
            <Logo className="h-12 text-white" />
          </Link>
        </div>
        <div className="grow bg-texture bg-zinc-900 text-white ~p-4/6 lg:w-96 lg:shrink-0 lg:grow-0">
          <Heading as="h1" size="sm" className="mb-6 mt-0">
            Build your board
          </Heading>

          <ButtonLink href={""} color="lime" icon="plus">
            Add to cart
          </ButtonLink>
        </div>
      </CustomizerControlsProvider>
    </div>
  );
}
