import { Eyebrow } from "@/components/ui/eyebrow";
import { ImageNote, Photo } from "@/components/ui/photo";
import { TextLink } from "@/components/ui/text-link";
import { servicePath, type Service } from "@/content/services";

export function ServiceTile({ service }: { service: Service }) {
  const lowerName = service.name.toLowerCase();
  return (
    <article className="service-tile">
      <div className="tile-photo">
        <Photo
          name={service.image}
          alt={`Illustrative ${lowerName} photography`}
        />
        <ImageNote />
      </div>
      <div className="tile-body">
        <Eyebrow>{service.category}</Eyebrow>
        <h2>{service.name}</h2>
        <p>{service.description}</p>
        <TextLink href={servicePath(service.slug)}>
          Explore {lowerName}
        </TextLink>
      </div>
    </article>
  );
}
