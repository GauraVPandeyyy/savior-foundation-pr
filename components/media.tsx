import Image from "next/image";
import type { MediaAsset } from "@/lib/content";

export function MediaFigure({
  asset,
  className = "",
  imageClassName = "",
  priority = false,
  caption = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
}: {
  asset: MediaAsset;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  caption?: boolean;
  sizes?: string;
}) {
  return (
    <figure className={`media-figure relative overflow-hidden ${className}`}>
      <Image
        src={asset.src}
        alt={asset.alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover ${imageClassName}`}
      />
      {/* {caption && asset.credit ? (
        <figcaption className="absolute bottom-3 left-3 right-3 rounded-full bg-black/45 px-3 py-1.5 text-[10px] leading-4 text-white/80 backdrop-blur-sm">
          Representative imagery · {asset.credit.replace("Representative image: ", "")}
        </figcaption>
      ) : null} */}
    </figure>
  );
}
