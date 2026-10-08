/** Wrap cards only outside the visible gallery; repeated sequences fill both edges. */
export function wrapMarqueePosition(position: number, loopWidth: number) {
  return ((position + loopWidth / 2) % loopWidth + loopWidth) % loopWidth - loopWidth / 2;
}

export function advanceMarquee(progress: number, seconds: number, speed: number, loopWidth: number, paused: boolean) {
  return paused ? progress : (progress + seconds * speed) % loopWidth;
}