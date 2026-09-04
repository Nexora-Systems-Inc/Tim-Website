import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  adjacentArtwork,
  isMostlyHorizontalSwipe,
  wrapIndex,
} from "./galleryNavigation.ts";

const works = [{ ref: "C-0008" }, { ref: "C-0009" }, { ref: "C-0010" }];

describe("galleryNavigation", () => {
  it("wraps forward from the last painting to the first", () => {
    assert.equal(wrapIndex(2, 3, 1), 0);
    assert.equal(adjacentArtwork(works, "C-0010", 1)?.ref, "C-0008");
  });

  it("wraps backward from the first painting to the last", () => {
    assert.equal(wrapIndex(0, 3, -1), 2);
    assert.equal(adjacentArtwork(works, "C-0008", -1)?.ref, "C-0010");
  });

  it("moves to the next and previous paintings in collection order", () => {
    assert.equal(adjacentArtwork(works, "C-0009", 1)?.ref, "C-0010");
    assert.equal(adjacentArtwork(works, "C-0009", -1)?.ref, "C-0008");
  });

  it("ignores vertical movement as a gallery swipe", () => {
    assert.equal(isMostlyHorizontalSwipe(-80, 10), true);
    assert.equal(isMostlyHorizontalSwipe(80, 10), true);
    assert.equal(isMostlyHorizontalSwipe(20, 80), false);
    assert.equal(isMostlyHorizontalSwipe(-30, -40), false);
  });
});
