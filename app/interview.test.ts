import { describe, expect, it } from "vitest";

import {
  HardwareStore,
  Item,
} from "./interview.ts";
;

describe("refactored HardwareStore", () => {
  function update(item: Item): Item {
    new HardwareStore([item]).updateQuality();
    return item;
  }

  it("degrades a standard item twice after its sell-by date without going below zero", () => {
    expect(update(new Item("Safety Vest", 0, 2))).toMatchObject({
      sellIn: -1,
      quality: 0,
    });
  });

  it("improves Glue twice after its sell-by date and caps quality at 50", () => {
    expect(update(new Item("Glue", 0, 49))).toMatchObject({
      sellIn: -1,
      quality: 50,
    });
  });

  it.each([
    { sellIn: 11, expectedQuality: 41 },
    { sellIn: 10, expectedQuality: 42 },
    { sellIn: 6, expectedQuality: 42 },
    { sellIn: 5, expectedQuality: 43 },
  ])(
    "updates a Parking Pass at the $sellIn-day threshold",
    ({ sellIn, expectedQuality }) => {
      expect(
        update(new Item("Parking Pass", sellIn, 40)),
      ).toMatchObject({
        sellIn: sellIn - 1,
        quality: expectedQuality,
      });
    },
  );

  it("drops an expired Parking Pass quality to zero", () => {
    expect(update(new Item("Parking Pass", 0, 40))).toMatchObject({
      sellIn: -1,
      quality: 0,
    });
  });

  it("does not change the Sledge Hammer", () => {
    expect(update(new Item("Sledge Hammer", 0, 80))).toMatchObject({
      sellIn: 0,
      quality: 80,
    });
  });

  it("mutates and returns the original item array", () => {
    const item = new Item("Safety Vest", 5, 10);
    const items = [item];
    const store = new HardwareStore(items);

    const result = store.updateQuality();

    expect(result).toBe(items);
    expect(result[0]).toBe(item);
  });

});
