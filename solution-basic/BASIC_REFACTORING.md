# Hardware Store (Gilded Rose) refactoring walkthrough

The refactor keeps the original Gilded Rose behaviour while making each item rule easy to locate, read, and change. The public API is unchanged: construct `HardwareStore` with `Item[]` and call `updateQuality()` once per day.

## 1. Smell: one deeply nested decision tree

The original `updateQuality` method mixes every item category, the sell-in update, the expired-item behaviour, and the quality bounds in one loop. Several conditions are repeated in separate branches, so understanding the rule for one type requires following several levels of nesting.

**Refactoring:** the loop now delegates one item at a time to `updateItem`. That method is a small, flat dispatcher:

1. Leave Sledge Hammer unchanged.
2. Apply the normal daily rule for Glue, parking passes, or ordinary items.
3. Decrease `sellIn`.
4. Apply the extra expired-item rule when appropriate.

This sequence intentionally preserves the original timing: the normal quality adjustment uses the *current* `sellIn`, then `sellIn` is decremented, then expiry is checked.

## 2. Smell: magic strings and numbers

Names such as `"Glue"` and values such as `50`, `11`, and `6` were embedded throughout the method. Typos and unexplained thresholds make future changes risky.

**Refactoring:** named constants define the three special item names and `MAX_QUALITY`. The backstage thresholds remain in their conditionals because they describe the rule itself: quality rises by one normally, by another point when fewer than 11 days remain, and by one more when fewer than 6 days remain.

## 3. Smell: duplicated quality-bound logic

The original code repeats checks such as “quality is below 50” and “quality is above zero” before changing quality. Repetition invites inconsistent handling when a new item type is added.

**Refactoring:** `increaseQuality` and `decreaseQuality` centralize the invariant:

- quality never increases beyond 50;
- ordinary quality never falls below 0.

`Math.min` and `Math.max` express those bounds directly, including when a caller begins with an unexpected quality value.

## 4. Smell: item-specific rules spread across the method

In the original code, Glue’s two daily increases are in different areas of the method; backstage-pass logic is also split between its regular and expired cases.

**Refactoring:** each named rule has one focused method:

| Method              | Rule                                                                                     |
| ------------------- | ---------------------------------------------------------------------------------------- |
| `updateGlue`        | Increases quality by 1 each day.                                                         |
| `updateParkingPass` | Increases by 1, with extra increases inside 11 and 6 days.                               |
| `updateExpiredItem` | Gives Glue a further increase, drops passes to 0, and degrades ordinary items once more. |

## 5. Special case: SLEDGE_HAMMER

Sledge Hammer is handled first with an early return. It never changes quality or `sellIn`, avoiding repeated “is not Sledge Hammer” guards in every branch.

## Result

Adding a new category now means adding a clearly named branch in `updateItem` and its focused rule method. The shared bounds and expiry handling remain in one place, which keeps the code short without obscuring the business rules.
