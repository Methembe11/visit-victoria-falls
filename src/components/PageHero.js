import Link from "next/link";

export default function PageHero({ eyebrow, title, sub, image, imageAlt, crumbs = [], meta = [] }) {
  return (
    <>
      <nav className="breadcrumbs shell" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;
          return (
            <span key={`${crumb.label}-${index}`}>
              <span aria-hidden="true">/</span>
              {crumb.href ? (
                <Link href={crumb.href} aria-current={isLast ? "page" : undefined}>
                  {crumb.label}
                </Link>
              ) : (
                <span aria-current={isLast ? "page" : undefined}>{crumb.label}</span>
              )}
            </span>
          );
        })}
      </nav>

      <section className="hero hero--page">
        <div className="hero__media">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt={imageAlt || ""} fetchPriority="high" />
        </div>
        <div className="hero__shade" aria-hidden="true" />
        <div className="shell hero__inner">
          <span className="eyebrow hero__eyebrow">{eyebrow}</span>
          <h1 className="hero__title">{title}</h1>
          {sub && <p className="hero__sub">{sub}</p>}
          {meta.length > 0 && (
            <div className="hero__meta" style={{ marginTop: 28 }}>
              {meta.map((item, index) => (
                <span key={`${item}-${index}`} style={{ display: "inline-flex", alignItems: "center", gap: 26 }}>
                  {index > 0 && <span className="sep" aria-hidden="true" />}
                  {item}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
