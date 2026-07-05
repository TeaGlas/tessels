import { useState } from "react";

const ASPECT_CLASS = {
  "4:3": "aspect-[4/3]",
  "3:2": "aspect-[3/2]",
  "1:1": "aspect-square",
};

/**
 * Renders `src` as an image; falls back to a labeled sage-gradient placeholder
 * if the image is missing (real photography not yet supplied). Pass
 * `priority` for above-the-fold images (e.g. the hero) so they load eagerly
 * at high priority instead of lazily — lazy-loading the page's LCP image
 * only delays it.
 */
export default function ImagePlaceholder({
  src,
  alt,
  label,
  aspect = "4:3",
  className = "",
  rounded = "rounded-lg",
  priority = false,
}) {
  const [errored, setErrored] = useState(false);
  const aspectClass = ASPECT_CLASS[aspect] ?? ASPECT_CLASS["4:3"];

  if (!src || errored) {
    return (
      <div
        className={`${aspectClass} ${rounded} ${className} flex items-center justify-center overflow-hidden bg-gradient-to-br from-sage-500 to-sage-700`}
        role="img"
        aria-label={alt}
      >
        <span className="rotate-[-4deg] font-mono text-xs uppercase tracking-widest text-white/80">
          {label ?? alt}
        </span>
      </div>
    );
  }

  return (
    <div className={`${aspectClass} ${rounded} ${className} overflow-hidden bg-mint`}>
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        // React 18.3's DOM renderer doesn't recognize the camelCase `fetchPriority`
        // prop yet (warns and drops it) — the lowercase HTML attribute is what
        // actually reaches the browser correctly.
        // eslint-disable-next-line react/no-unknown-property
        fetchpriority={priority ? "high" : "auto"}
        decoding="async"
        onError={() => setErrored(true)}
        className="h-full w-full object-cover"
      />
    </div>
  );
}
