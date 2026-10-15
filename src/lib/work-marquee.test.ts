import { describe, test } from "node:test";
import { strict as assert } from "node:assert";
import { advanceMarquee, dragMarquee, isMarqueeDrag, marqueeSpeed, wrapMarqueePosition } from "./work-marquee";

describe("Selected Work motion", () => {
  test("speed is noticeably faster without exceeding a third increase", () => {
    assert.equal(marqueeSpeed(375), 36);
    assert.equal(marqueeSpeed(1280), 46);
    assert.ok(marqueeSpeed(375) > 27 && marqueeSpeed(375) <= 27 * 4 / 3);
    assert.ok(marqueeSpeed(1280) > 35 && marqueeSpeed(1280) <= 35 * 4 / 3);
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
  test("dragging moves in either direction and wraps without resetting", () => {
    assert.equal(dragMarquee(120, -80, 6000), 200);
    assert.equal(dragMarquee(120, 160, 6000), 5960);
    assert.equal(advanceMarquee(dragMarquee(120, -80, 6000), 1, 46, 6000, false), 246);
  });
  test("taps and vertical swipes do not become horizontal drags", () => {
    assert.equal(isMarqueeDrag(6, 0), false);
    assert.equal(isMarqueeDrag(30, 80), false);
    assert.equal(isMarqueeDrag(-20, 5), true);
  });
  test("loop reset leaves the visible sequence in the same position", () => {
    const after = advanceMarquee(5990, 1, 30, 6000, false);
    assert.equal(after, 20);
    assert.equal(wrapMarqueePosition(1000 - after, 6000), wrapMarqueePosition(1000 - 6020, 6000));
    assert.ok(Math.abs(wrapMarqueePosition(3001, 6000)) > 1920);
  });
});