import Link from "next/link";

export default function ListingCard({ href, image, alt, tag, title, excerpt, meta = [], cta = "View details", ratio = "4x3", priority = false }) {
  return (
    <Link href={href} className="card" data-track="listing_click" data-track-label={title}>
      <div className={`card__media card__media--${ratio}`}>
        {tag && <span className="card__tag">{tag}</span>}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt={alt || title} loading={priority ? "eager" : "lazy"} />
      </div>
      <div className="card__body">
        {meta.length > 0 && (
          <div className="card__meta">
            {meta.map((m) => (
              <span key={m}>{m}</span>
            ))}
          </div>
        )}
        <h3 className="card__title">{title}</h3>
        {excerpt && <p className="card__excerpt">{excerpt}</p>}
        <div className="card__foot">
          <span>{cta}</span>
          <span className="arrow-circle" aria-hidden="true">↗</span>
        </div>
      </div>
    </Link>
  );
}
