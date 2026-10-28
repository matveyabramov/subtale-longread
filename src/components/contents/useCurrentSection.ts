import { useEffect, useState } from 'react';
import { sectionIds, type SectionId } from '../../shared/navigation';

export function useCurrentSection() {
  const [current, setCurrent] = useState<SectionId>('hero');

  useEffect(() => {
    const sections = sectionIds.map((id) => document.getElementById(id)).filter((section) => section !== null);
    let observer: IntersectionObserver;
    let frame = 0;
    const update = () => {
      let active: SectionId = 'hero';
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= window.innerHeight * 0.3) active = section.id as SectionId;
      }
      // A short final chapter may never reach the reading line at maximum scroll.
      const footer = document.getElementById('footer');
      if (footer && footer.getBoundingClientRect().top < window.innerHeight &&
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) active = 'footer';
      setCurrent(active);
    };
    const observe = () => {
      observer?.disconnect();
      const top = Math.floor(window.innerHeight * 0.3);
      observer = new IntersectionObserver(update, {
        rootMargin: `-${top}px 0px -${window.innerHeight - top - 1}px 0px`,
      });
      sections.forEach((section) => observer.observe(section));
      update();
    };
    const afterNavigation = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    const footerObserver = new IntersectionObserver(update, { threshold: [0, 1] });
    const footer = document.getElementById('footer');
    if (footer) footerObserver.observe(footer);
    observe();
    window.addEventListener('resize', observe);
    window.addEventListener('hashchange', afterNavigation);
    window.addEventListener('popstate', afterNavigation);
    return () => {
      observer.disconnect();
      footerObserver.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', observe);
      window.removeEventListener('hashchange', afterNavigation);
      window.removeEventListener('popstate', afterNavigation);
    };
  }, []);
  return current;
}
