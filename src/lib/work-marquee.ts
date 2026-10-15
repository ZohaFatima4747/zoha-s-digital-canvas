/** Wrap cards only outside the visible gallery; repeated sequences fill both edges. */
export function wrapMarqueePosition(position: number, loopWidth: number) {
  return ((position + loopWidth / 2) % loopWidth + loopWidth) % loopWidth - loopWidth / 2;
}

export function advanceMarquee(progress: number, seconds: number, speed: number, loopWidth: number, paused: boolean) {
  return paused ? progress : (progress + seconds * speed) % loopWidth;
}

/** Pointer travel updates the same wrapped position used by automatic motion. */
export function dragMarquee(progress: number, deltaX: number, loopWidth: number) {
  return ((progress - deltaX) % loopWidth + loopWidth) % loopWidth;
}

export function isMarqueeDrag(deltaX: number, deltaY: number) {
  return Math.abs(deltaX) > 6 && Math.abs(deltaX) > Math.abs(deltaY);
}

/** Noticeably faster than 27/35, while retaining a calm continuous glide. */
export function marqueeSpeed(viewport: number) {
  return viewport < 768 ? 36 : 46;
}