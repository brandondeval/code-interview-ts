import { describe, expect, it } from "vitest";

import {
  HardwareStore as LegacyHardwareStore,
  Item as LegacyItem,
} from "../app/interview.ts";
import {
  HardwareStore as RefactoredHardwareStore,
  Item as RefactoredItem,
} from "../solutions/solution-expert/expert-solution.ts";

describe("refactored HardwareStore", () => {
  function update(item: RefactoredItem): RefactoredItem {
    new RefactoredHardwareStore([item]).updateQuality();
    return item;
  }

  it("degrades a standard item twice after its sell-by date without going below zero", () => {
    expect(update(new RefactoredItem("Safety Vest", 0, 2))).toMatchObject({
      sellIn: -1,
      quality: 0,
    });
  });

  it("improves Glue twice after its sell-by date and caps quality at 50", () => {
    expect(update(new RefactoredItem("Glue", 0, 49))).toMatchObject({
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
        update(new RefactoredItem("Parking Pass", sellIn, 40)),
      ).toMatchObject({
        sellIn: sellIn - 1,
        quality: expectedQuality,
      });
    },
  );

  it("drops an expired Parking Pass quality to zero", () => {
    expect(update(new RefactoredItem("Parking Pass", 0, 40))).toMatchObject({
      sellIn: -1,
      quality: 0,
    });
  });

  it("does not change the legendary Sledge Hammer", () => {
    expect(update(new RefactoredItem("Sledge Hammer", 0, 80))).toMatchObject({
      sellIn: 0,
      quality: 80,
    });
  });

  it("mutates and returns the original item array", () => {
    const item = new RefactoredItem("Safety Vest", 5, 10);
    const items = [item];
    const store = new RefactoredHardwareStore(items);

    const result = store.updateQuality();

    expect(result).toBe(items);
    expect(result[0]).toBe(item);
  });

  it("matches the legacy implementation across names and rule boundaries", () => {
    const names = [
      "Safety Vest",
      "Glue",
      "Parking Pass",
      "Sledge Hammer",
    ];
    const sellIns = [-1, 0, 1, 5, 6, 10, 11];
    const qualities = [-1, 0, 1, 49, 50, 51, 80];

    for (const name of names) {
      for (const sellIn of sellIns) {
        for (const quality of qualities) {
          const legacyItem = new LegacyItem(name, sellIn, quality);
          const refactoredItem = new RefactoredItem(name, sellIn, quality);
          const legacyStore = new LegacyHardwareStore([legacyItem]);
          const refactoredStore = new RefactoredHardwareStore([refactoredItem]);

          for (let day = 0; day < 3; day += 1) {
            legacyStore.updateQuality();
            refactoredStore.updateQuality();

            expect({
              name: refactoredItem.name,
              sellIn: refactoredItem.sellIn,
              quality: refactoredItem.quality,
            }).toEqual({
              name: legacyItem.name,
              sellIn: legacyItem.sellIn,
              quality: legacyItem.quality,
            });
          }
        }
      }
    }
  });
});
