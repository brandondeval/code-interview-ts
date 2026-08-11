export class Item {
  constructor(
    public name: string,
    public sellIn: number,
    public quality: number,
  ) {}
}

const GLUE = 'Glue';
const SLEDGE_HAMMER = 'Sledge Hammer';
const PARKING_PASS = 'Parking Pass';
const PARKING_PASS_FIRST_THRESHOLD = 11;
const PARKING_PASS_SECOND_THRESHOLD = 6;
const MAX_QUALITY = 50;
const MINIMUM_QUALITY = 0;

abstract class ItemUpdater {
  update(item: Item): void {
    this.updateQuality(item);
    this.decreaseSellIn(item);

    if (!this.isExpired(item)) {
      return;
    }

    this.updateExpiredItem(item);
  }

  protected abstract updateQuality(item: Item): void;

  protected updateExpiredItem(item: Item): void {
    this.decreaseQuality(item);
    
  }

  protected increaseQuality(item: Item): void {
    if (item.quality >= MAX_QUALITY) {
      return;
    }

    item.quality += 1;
  }

  protected decreaseQuality(item: Item): void {
    if (item.quality <= MINIMUM_QUALITY) {
      return;
    }

    item.quality -= 1;
  }

  private decreaseSellIn(item: Item): void {
    item.sellIn -= 1;
  }

  private isExpired(item: Item): boolean {
    return item.sellIn < 0;
  }
}

/**
 * For NormalItemUpdater, GlueUpdater, ParkingPassUpdater, SledgeHammerUpdater:
 * They all implement a private constructor (Singleton Pattern) and
 * instead make use of a static getInstance method instead of 
 * instantiating a new classe each loop iteration
 */


class NormalItemUpdater extends ItemUpdater {
  private static instance: NormalItemUpdater;

  private constructor() {
    super();
  }
  
  public static getInstance(): NormalItemUpdater {
    if (!NormalItemUpdater.instance) {
      NormalItemUpdater.instance = new NormalItemUpdater();
    }
    return NormalItemUpdater.instance;
  }

  protected updateQuality(item: Item): void {
    this.decreaseQuality(item);
  }
}

class GlueUpdater extends ItemUpdater {
  private static instance: GlueUpdater;

  private constructor() {
    super();
  }

  public static getInstance(): GlueUpdater {
    if (!GlueUpdater.instance) {
      GlueUpdater.instance = new GlueUpdater();
    }
    return GlueUpdater.instance;
  }

  protected updateQuality(item: Item): void {
    this.increaseQuality(item);
  }

  protected updateExpiredItem(item: Item): void {
    this.increaseQuality(item);
  }
}

class ParkingPassUpdater extends ItemUpdater {
  private static instance: ParkingPassUpdater;

  private constructor() {
    super();
  }

  public static getInstance(): ParkingPassUpdater {
    if (!ParkingPassUpdater.instance) {
      ParkingPassUpdater.instance = new ParkingPassUpdater();
    }
    return ParkingPassUpdater.instance;
  }

  protected updateQuality(item: Item): void {
    this.increaseQuality(item);

    if (item.sellIn < PARKING_PASS_FIRST_THRESHOLD) {
      this.increaseQuality(item);
    }

    if (item.sellIn < PARKING_PASS_SECOND_THRESHOLD) {
      this.increaseQuality(item);
    }
  }

  protected updateExpiredItem(item: Item): void {
    item.quality = MINIMUM_QUALITY;
  }
}

class SledgeHammerUpdater extends ItemUpdater {
  private static instance: SledgeHammerUpdater;

  private constructor() {
    super();
  }

  public static getInstance(): SledgeHammerUpdater {
    if (!SledgeHammerUpdater.instance) {
      SledgeHammerUpdater.instance = new SledgeHammerUpdater();
    }
    return SledgeHammerUpdater.instance;
  }

  protected updateQuality(): void { 
    // Special items do not age and their quality never changes.
  }
}

export class HardwareStore {
  constructor(public items: Item[] = []) {}

  updateQuality(): Item[] {
    for (const item of this.items) {
      if (item.name === SLEDGE_HAMMER) {
        continue;
      }

      this.updaterFor(item).update(item);
    }

    return this.items;
  }

  updaterFor(item: Item): ItemUpdater {
    switch (item.name) {
      case GLUE:
        return GlueUpdater.getInstance();
      case PARKING_PASS:
        return ParkingPassUpdater.getInstance();
      case SLEDGE_HAMMER:
        return SledgeHammerUpdater.getInstance();
      default:
        return NormalItemUpdater.getInstance();
    }
  }
}