import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react";
import { asImageSrc, Content } from "@prismicio/client";

import { Bounded } from "@/components/bounded";
import { Heading } from "@/components/heading";
import { ButtonLink } from "@/components/button-link";
import { WideLogo } from "./wide-logo";
import { TallLogo } from "./tall-logo";
import { InteractiveSkateboard } from "./interactive-skateboard";

export  const DEFAULT_DECK_TEXTURE = "/skateboard/Deck.webp";
export  const DEFAULT_WHEEL_TEXTURE = "/skateboard/SkateWheel1.png";
export  const DEFAULT_TRUCK_COLOR = "#6F6E6A";
export  const DEFAULT_BOLT_COLOR = "#6F6E6A";

export type HeroProps = SliceComponentProps<Content.HeroSlice>;

const Hero = ({ slice }: HeroProps) => {
  const deckTextureUrl =
    asImageSrc(slice.primary.skateboard_deck_texture) || DEFAULT_DECK_TEXTURE;
  const wheelTextureUrl =
    asImageSrc(slice.primary.skateboard_wheel_texture) || DEFAULT_WHEEL_TEXTURE;
  const boltColor = slice.primary.skateboard_bolt_color || DEFAULT_BOLT_COLOR;
  const truckColor =
    slice.primary.skateboard_truck_color || DEFAULT_TRUCK_COLOR;

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-brand-pink relative h-dvh overflow-hidden text-zink-800 bg-texture"
    >
      <div className="absolute inset-0 flex items-center pt-20">
        <WideLogo className="w-full text-brand-purple hidden opacity-20 mix-blend-multiply lg:block" />
        <TallLogo className="w-full text-brand-purple  opacity-20 mix-blend-multiply lg:hidden" />
      </div>

      <div className="absolute inset-0 mx-auto mt-24 grid max-w-6xl grid-rows-[1fr,auto] place-items-end px-6 ~py-10/16">
        <Heading className="relative max-w-2xl place-self-start">
          <PrismicText field={slice.primary.heading} />
        </Heading>

        <div className="flex relative w-full flex-col items-center justify-between ~gap-2/4 lg:flex-row">
          <div className="max-w-[45ch] font-semibold ~text-lg/xl">
            <PrismicRichText field={slice.primary.body} />
          </div>
          <ButtonLink
            field={slice.primary.button}
            icon={"skateboard"}
            size="lg"
            className="z-20 mt-2 block"
          >
            {slice.primary.button.text}
          </ButtonLink>
        </div>
      </div>

      <InteractiveSkateboard
        deckTextureUrl={deckTextureUrl}
        wheelTextureUrl={wheelTextureUrl}
        truckColor={truckColor}
        boltColor={boltColor}

      />
    </Bounded>
  );
};

export default Hero;
