import Image from "next/image";
import { photos, type PhotoName } from "@/content/photos";

const SIZES = "(max-width: 680px) 100vw, (max-width: 1100px) 80vw, 100vw";

type PhotoProps = {
  name: PhotoName;
  alt: string;
  /** Above-the-fold (LCP) image: load eagerly with high fetch priority. */
  priority?: boolean;
};

export function Photo({ name, alt, priority = false }: PhotoProps) {
  return (
    <Image
      src={photos[name].full}
      alt={alt}
      sizes={SIZES}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
    />
  );
}

/** Badge marking a photo as an AI-generated illustration. */
export function ImageNote() {
  return <span className="image-note">AI-generated illustrative image</span>;
}
