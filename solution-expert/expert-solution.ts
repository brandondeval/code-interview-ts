export class Item {
  constructor(
    public name: string,
    public sellIn: number,
    public quality: number,
  ) {}
}

const GLUE = 'Glue';
const PARKING_PASS = 'Parking Pass';
const SLEDGE_HAMMER = 'Sledge Hammer';
const MAX_QUALITY = 50;

abstract class ItemUpdater {
  update(item: Item): void {
    this.updateQuality(item);
    item.sellIn--;

    if (item.sellIn < 0) {
      this.updateExpiredItem(item);
    }
  }

  protected abstract updateQuality(item: Item): void;

  protected updateExpiredItem(item: Item): void {
    this.decreaseQuality(item);
  }

  protected increaseQuality(item: Item): void {
    item.quality = Math.min(MAX_QUALITY, item.quality + 1);
  }

  protected decreaseQuality(item: Item): void {
    item.quality = Math.max(0, item.quality - 1);
  }
}

class NormalItemUpdater extends ItemUpdater {
  protected updateQuality(item: Item): void {
    this.decreaseQuality(item);
  }
}

class GlueUpdater extends ItemUpdater {
  protected updateQuality(item: Item): void {
    this.increaseQuality(item);
  }

  protected updateExpiredItem(item: Item): void {
    this.increaseQuality(item);
  }
}

class ParkingPassUpdater extends ItemUpdater {
  protected updateQuality(item: Item): void {
    this.increaseQuality(item);

    if (item.sellIn < 11) {
      this.increaseQuality(item);
    }

    if (item.sellIn < 6) {
      this.increaseQuality(item);
    }
  }

  protected updateExpiredItem(item: Item): void {
    item.quality = 0;
  }
}

const normalItemUpdater = new NormalItemUpdater();
const glueUpdater = new GlueUpdater();
const parkingPassUpdater = new ParkingPassUpdater();

function updaterFor(item: Item): ItemUpdater {
  switch (item.name) {
    case GLUE:
      return glueUpdater;
    case PARKING_PASS:
      return parkingPassUpdater;
    default:
      return normalItemUpdater;
  }
}

export class HardwareStore {
  constructor(public items: Item[] = []) {}

  updateQuality(): Item[] {
    for (const item of this.items) {
      if (item.name === SLEDGE_HAMMER) {
        continue;
      }

      updaterFor(item).update(item);
    }

    return this.items;
  }
}
