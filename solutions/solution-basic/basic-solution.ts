export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name: string, sellIn: number, quality: number) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const GLUE = 'Glue';
const PARKING_PASS = 'Parking Pass';
const SLEDGE_HAMMER = 'Sledge Hammer';
const MAX_QUALITY = 50;

export class HardwareStore {
  constructor(public items: Item[] = []) {}

  updateQuality(): Item[] {
    for (const item of this.items) {
      this.updateItem(item);
    }

    return this.items;
  }

  private updateItem(item: Item): void {
    if (item.name === SLEDGE_HAMMER) {
      return;
    }

    if (item.name === GLUE) {
      this.updateGlue(item);
    } else if (item.name === PARKING_PASS) {
      this.updateParkingPass(item);
    } else {
      this.decreaseQuality(item);
    }

    item.sellIn--;

    if (item.sellIn < 0) {
      this.updateExpiredItem(item);
    }
  }

  private updateGlue(item: Item): void {
    this.increaseQuality(item);
  }

  private updateParkingPass(item: Item): void {
    this.increaseQuality(item);

    if (item.sellIn < 11) {
      this.increaseQuality(item);
    }

    if (item.sellIn < 6) {
      this.increaseQuality(item);
    }
  }

  private updateExpiredItem(item: Item): void {
    if (item.name === GLUE) {
      this.increaseQuality(item);
    } else if (item.name === PARKING_PASS) {
      item.quality = 0;
    } else {
      this.decreaseQuality(item);
    }
  }

  private increaseQuality(item: Item): void {
    item.quality = Math.min(MAX_QUALITY, item.quality + 1);
  }

  private decreaseQuality(item: Item): void {
    item.quality = Math.max(0, item.quality - 1);
  }
}
