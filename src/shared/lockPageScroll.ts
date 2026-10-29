const locks = new Set<symbol>();
let restore: ((position: boolean) => void) | null = null;
let restorePosition = true;

/** One iOS-safe page lock, shared by the Experiment layer and its help dialog. */
export function lockPageScroll({ fixedBody = true }: { fixedBody?: boolean } = {}) {
  if (locks.size === 0) {
    restorePosition = true;
    const root = document.documentElement;
    const body = document.body;
    const x = window.scrollX;
    const y = window.scrollY;
    const gutter = window.innerWidth - root.clientWidth;
    const padding = getComputedStyle(body).paddingRight;
    const properties = [
      [root, ['overflow', 'overscroll-behavior']],
      [body, ['position', 'top', 'left', 'width', 'overflow', 'padding-right']],
    ] as const;
    const previous = properties.flatMap(([element, names]) => names.map((name) => ({
      element, name, value: element.style.getPropertyValue(name), priority: element.style.getPropertyPriority(name),
    })));
    root.style.setProperty('overflow', 'hidden');
    root.style.setProperty('overscroll-behavior', 'none');
    if (fixedBody) {
      body.style.setProperty('position', 'fixed');
      body.style.setProperty('top', `${-y}px`);
      body.style.setProperty('left', `${-x}px`);
      body.style.setProperty('width', '100%');
      body.style.setProperty('overflow', 'hidden');
      if (gutter) body.style.setProperty('padding-right', `calc(${padding} + ${gutter}px)`);
    }
    restore = (position) => {
      previous.forEach(({ element, name, value, priority }) => {
        if (value) element.style.setProperty(name, value, priority);
        else element.style.removeProperty(name);
      });
      if (position) window.scrollTo({ left: x, top: y, behavior: 'instant' });
    };
  }
  const token = Symbol('page-scroll-lock');
  locks.add(token);
  return (position = true) => {
    if (!locks.delete(token)) return;
    restorePosition &&= position;
    if (locks.size) return;
    const release = restore;
    restore = null;
    release?.(restorePosition);
  };
}
