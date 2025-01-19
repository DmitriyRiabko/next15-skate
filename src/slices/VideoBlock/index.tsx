import { Bounded } from "@/components/bounded";
import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { LazyYouTubePlayer } from "./lazy-youtube-player";
import clsx from "clsx";
import Image from "next/image";

export type VideoBlockProps = SliceComponentProps<Content.VideoBlockSlice>;

const MASK_CLASSES =
  "[mask-image:url(/video-mask.png)] [mask-mode:alpha] [mask-position:center_center] [mask-repeat:no-repeat] [mask-size:100%_auto]";

const VideoBlock = ({ slice }: VideoBlockProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-texture bg-zinc-900"
    >
      <h2 className="sr-only">Video Reel</h2>
      <div className="relative aspect-video">
        <div
          className={clsx(
            MASK_CLASSES,
            "bg-brand-lime absolute inset-0 ~translate-x-2/3 ~translate-y-2/3"
          )}
        />

        <div
          className={clsx(
            MASK_CLASSES,
            "bg-white absolute inset-0 ~translate-x-1/3 ~translate-y-1/2"
          )}
        />

        <div
          className={clsx(
            MASK_CLASSES,
            "bg-white absolute inset-0 ~translate-x-1/2 ~-translate-y-1/3"
          )}
        />
        <div className={clsx(MASK_CLASSES, "relative h-full ")}>
          {isFilled.keyText(slice.primary.youtube_video_id) ? (
            <LazyYouTubePlayer youTubeID={slice.primary.youtube_video_id} />
          ) : undefined}
          <Image
            src={"/image-texture.png"}
            alt="image"
            fill
            className="pointer-events-none opacity-50"
          />
        </div>
      </div>
    </Bounded>
  );
};

export default VideoBlock;
