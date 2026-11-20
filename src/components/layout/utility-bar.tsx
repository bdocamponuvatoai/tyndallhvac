import { site } from "@/config/site";

export function UtilityBar() {
  return (
    <div className="utility">
      <div className="container">
        <span>{`Locally owned. Home focused. Since ${site.foundedYear}.`}</span>
        <a href={site.phoneHref}>
          Let’s talk comfort <b>{site.phone}</b>
        </a>
      </div>
    </div>
  );
}
