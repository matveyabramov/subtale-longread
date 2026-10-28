export function readingViewportTop() {
  const viewport = window.visualViewport;
  return window.matchMedia('(max-width: 600px)').matches && viewport && Math.abs(viewport.scale - 1) < 0.01
    ? viewport.offsetTop : 0;
}

/** Experiment frames follow the visible viewport, including Safari's pan offset. */
export function scrollToReadingTarget(target: HTMLElement) {
  if (target.id === 'experiment' || target.parentElement?.id === 'experiment') {
    const top = window.scrollY + target.getBoundingClientRect().top - readingViewportTop();
    // WebKit can quantize scroll positions to whole CSS pixels. Round towards
    // the target, so a fractional preceding frame cannot remain above it.
    window.scrollTo({ top: Math.ceil(top), behavior: 'instant' });
  } else {
    target.scrollIntoView({ behavior: 'instant', block: 'start' });
  }
}
