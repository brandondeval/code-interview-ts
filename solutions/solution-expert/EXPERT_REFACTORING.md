# Hardware Store (Gilded Rose): Martin Fowler's 2nd-edition refactoring walkthrough

This solution deliberately applies refactorings named in Martin Fowler's *Refactoring: Improving the Design of Existing Code*, 2nd edition. The code keeps the kata's existing behaviour and public API: call `updateQuality()` once for each day.

## Starting smells

`updateQuality` was a **Long Function** with deeply nested conditionals. The same item-name checks, quality-bound checks, and quality mutations appeared in multiple branches. This made each business rule difficult to see as a whole and made a new item category risky to add.

## 1. Extract Function

First, the distinct responsibilities were separated into focused functions:

- `increaseQuality` and `decreaseQuality` hold the quality-bound rules.
- `updateQuality` and `updateExpiredItem` describe an individual category's regular and expired behaviour.
- `updaterFor` identifies the behaviour object for an item.

This is Fowler's **Extract Function**: move a fragment that has a clear purpose into a named function. The names expose the intent that the nested statements previously hid.

## 2. Replace Magic Literal

The special item names and the maximum quality value are now named constants: `GLUE`, `PARKING_PASS`, `SLEDGE_HAMMER`, and `MAX_QUALITY`.

This is **Replace Magic Literal**. The literal `50` is an invariant rather than an unexplained arithmetic value; the named constant gives it one authoritative meaning. The `< 11` and `< 6` thresholds stay beside the backstage-pass rule because they are part of that rule's readable policy.

## 3. Replace Nested Conditional with Guard Clauses

The former method repeatedly asked whether the item was not Sulfuras before doing work. `updateQuality` now uses `continue` as a guard clause: the exceptional, legendary item skips the rest of the loop immediately. The normal path is therefore flat:

1. Update the category's quality.
2. Decrease `sellIn`.
3. Apply its post-expiry rule.

This is the intent of **Replace Nested Conditional with Guard Clauses**: make exceptional cases visible and leave the main flow unindented.

## 4. Replace Conditional with Polymorphism

The original `if` tree chose behaviour by `item.name` in several places. Apart from the 'Sledge Hammer' guard clause, it has been replaced by one dispatch in `updaterFor` and three updater subclasses:

| Updater              | Regular rule                                         | Expired rule                    |
| -------------------- | ---------------------------------------------------- | ------------------------------- |
| `NormalItemUpdater`  | Quality decreases by 1.                              | Quality decreases by another 1. |
| `GlueUpdater`        | Quality increases by 1.                              | Quality increases by another 1. |
| `ParkingPassUpdater` | Increases by 1, plus increases inside 11 and 6 days. | Quality becomes 0.              |

This is **Replace Conditional with Polymorphism**. Each variation now owns its own rule, rather than requiring edits to a shared conditional in multiple locations. `ItemUpdater` retains only behaviour that is genuinely common: the sell-in decrement and bounded quality helpers.

## Behaviour-preservation detail

The order of operations is intentional and matches the original implementation. A category uses today's `sellIn` when calculating its normal change; only then is `sellIn` decremented; then the expired rule applies when it becomes negative. For example, a backstage pass at `sellIn === 0` gains its normal pre-concert increase before being set to quality `0`.

## Result

Adding a category is now localized: add an updater class and one case to `updaterFor`. The old function's scattered conditionals and duplicated bounds do not need to change.

The naming above follows Fowler's second-edition catalog, where:
**Extract Function**, 
**Replace Nested Conditional with Guard Clauses**, and 
**Replace Conditional with Polymorphism** are catalogued refactorings; 
**Replace Magic Literal** is the second-edition name for the earlier magic-number refactoring.
