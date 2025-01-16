import { Bounded } from "@/components/bounded";
import { ButtonLink } from "@/components/button-link";
import { Heading } from "@/components/heading";
import { Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import clsx from "clsx";
import { ParallaxImage } from "./parallax-image";

export type TextAndImageProps = SliceComponentProps<Content.TextAndImageSlice>;

const TextAndImage = ({ slice }: TextAndImageProps): JSX.Element => {
  const theme = slice.primary.theme;

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={clsx(
        theme === "Blue" && "bg-texture bg-brand-blue text-white",
        theme === "Lime" && "bg-texture bg-brand-lime text-white",
        theme === "Orange" && "bg-texture bg-brand-orange text-white",
        theme === "Navy" && "bg-texture bg-brand-navy text-white"
      )}
    >
      <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-24">
        <div
          className={clsx(
            "flex flex-col items-center gap-8 text-center md:items-start md:text-left",
            slice.variation === "imageOnLeft" && "md:order-2"
          )}
        >
          <Heading size="lg" as="h2">
            <PrismicRichText field={slice.primary.heading} />
          </Heading>

          <div className="max-w-md text-lg leading-relaxed">
            <PrismicRichText field={slice.primary.body} />
          </div>
          <ButtonLink
            color={theme === "Lime" ? "orange" : "lime"}
            field={slice.primary.button}
          >
            {slice.primary.button.text}
          </ButtonLink>
        </div>

        <ParallaxImage
          foregroundImage={slice.primary.foreground_image}
          backgroundImage={slice.primary.background_image}
        />
      </div>
    </Bounded>
  );
};

export default TextAndImage;
