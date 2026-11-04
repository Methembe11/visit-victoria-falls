import Link from "next/link";
import { images } from "@/data/site";

export const metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="hero hero--page hero--short">
      <div className="hero__media">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={images.fallsCity} alt="" />
      </div>
      <div className="hero__shade" aria-hidden="true" />
      <div className="shell hero__inner">
        <span className="eyebrow hero__eyebrow">404</span>
        <h1 className="hero__title">This path ends here.</h1>
        <p className="hero__sub">
          The page you were looking for has moved or never existed. The Falls are still where you left
          them.
        </p>
        <div className="hero__actions">
          <Link href="/" className="btn btn--solid">Back to home</Link>
          <Link href="/things-to-do" className="btn btn--ghost-light">Explore experiences</Link>
        </div>
      </div>
    </section>
  );
}
