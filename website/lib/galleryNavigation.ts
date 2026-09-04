export type GalleryWork = { ref: string };

export function wrapIndex(index: number, total: number, direction: -1 | 1): number {
  if (total <= 0) return 0;
  return (index + direction + total) % total;
}

export function adjacentArtwork<T extends GalleryWork>(
  works: T[],
  currentRef: string,
  direction: -1 | 1,
): T | null {
  if (works.length === 0) return null;
  const index = works.findIndex((work) => work.ref === currentRef);
  if (index < 0) return works[0] ?? null;
  return works[wrapIndex(index, works.length, direction)] ?? null;
}

export function isMostlyHorizontalSwipe(
  dx: number,
  dy: number,
  threshold = 48,
): boolean {
  return Math.abs(dx) >= threshold && Math.abs(dx) > Math.abs(dy) * 1.2;
}
