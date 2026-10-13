import assert from "node:assert/strict";
import test from "node:test";
import {
  clearHiddenSelections,
  selectProductIds,
  toggleVisibleSelection,
} from "./selection.js";

test("selects and deselects one visible product", () => {
  assert.deepEqual(selectProductIds(["a", "b"], [], "a", false, null), ["a"]);
  assert.deepEqual(selectProductIds(["a", "b"], ["a"], "a", false, null), []);
});

test("select all and deselect all operate on visible rows", () => {
  assert.deepEqual(toggleVisibleSelection(["a", "b"], []), ["a", "b"]);
  assert.deepEqual(toggleVisibleSelection(["a", "b"], ["a", "b", "hidden"]), []);
});

test("shift selection includes the visible range", () => {
  assert.deepEqual(
    selectProductIds(["a", "b", "c", "d"], ["b"], "d", true, "b"),
    ["b", "c", "d"],
  );
});

test("hidden selections are cleared after filtering", () => {
  assert.deepEqual(clearHiddenSelections(["a", "hidden"], ["a"]), ["a"]);
});
