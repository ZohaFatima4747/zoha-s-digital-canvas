import { describe, test } from "node:test";
import { strict as assert } from "node:assert";
import { advanceMarquee, marqueeSpeed, wrapMarqueePosition } from "./work-marquee";

describe("Selected Work motion", () => {
  test("speed increases slightly on mobile and desktop", () => {
    assert.equal(marqueeSpeed(375), 27);
    assert.equal(marqueeSpeed(1280), 35);
    assert.ok(marqueeSpeed(375) > 23 && marqueeSpeed(375) < 23 * 1.2);
    assert.ok(marqueeSpeed(1280) > 30 && marqueeSpeed(1280) < 30 * 1.2);
  });
  test("moves right to left at a consistent speed", () => {
    const first = advanceMarquee(0, 1, 30, 6000, false);
    const second = advanceMarquee(first, 1, 30, 6000, false);
    assert.equal(wrapMarqueePosition(-first, 6000), -30);
    assert.equal(wrapMarqueePosition(-second, 6000), -60);
  });
  test("hover freezes progress and leaving resumes from that position", () => {
    assert.equal(advanceMarquee(120, 1, 30, 6000, true), 120);
    assert.equal(advanceMarquee(120, 1, 30, 6000, false), 150);
  });
  test("loop reset leaves the visible sequence in the same position", () => {
    const after = advanceMarquee(5990, 1, 30, 6000, false);
    assert.equal(after, 20);
    assert.equal(wrapMarqueePosition(1000 - after, 6000), wrapMarqueePosition(1000 - 6020, 6000));
    assert.ok(Math.abs(wrapMarqueePosition(3001, 6000)) > 1920);
  });
});