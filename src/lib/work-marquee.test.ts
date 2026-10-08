import { describe, expect, test } from "bun:test";
import { advanceMarquee, wrapMarqueePosition } from "./work-marquee";

describe("Selected Work motion", () => {
  test("moves right to left at a consistent speed", () => {
    const first = advanceMarquee(0, 1, 30, 6000, false);
    const second = advanceMarquee(first, 1, 30, 6000, false);
    expect(wrapMarqueePosition(-first, 6000)).toBe(-30);
    expect(wrapMarqueePosition(-second, 6000)).toBe(-60);
  });
  test("hover freezes progress and leaving resumes from that position", () => {
    expect(advanceMarquee(120, 1, 30, 6000, true)).toBe(120);
    expect(advanceMarquee(120, 1, 30, 6000, false)).toBe(150);
  });
  test("loop reset leaves the visible sequence in the same position", () => {
    const after = advanceMarquee(5990, 1, 30, 6000, false);
    expect(after).toBe(20);
    expect(wrapMarqueePosition(1000 - after, 6000)).toBe(wrapMarqueePosition(1000 - 6020, 6000));
    expect(Math.abs(wrapMarqueePosition(3001, 6000))).toBeGreaterThan(1920);
  });
});