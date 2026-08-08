/**
 * This is some messy Typsescript code. The goal is to refactor the code to be more readable.
 */

export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class HardwareStore {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].name != 'Glue' && this.items[i].name != 'Parking Pass') {
        if (this.items[i].quality > 0) {
          if (this.items[i].name != 'Sledge Hammer') {
            this.items[i].quality = this.items[i].quality - 1
          }
        }
      } else {
        if (this.items[i].quality < 50) {
          this.items[i].quality = this.items[i].quality + 1
          if (this.items[i].name == 'Parking Pass') {
            if (this.items[i].sellIn < 11) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1
              }
            }
            if (this.items[i].sellIn < 6) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1
              }
            }
          }
        }
      }
      if (this.items[i].name != 'Sledge Hammer') {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }
      if (this.items[i].sellIn < 0) {
        if (this.items[i].name != 'Glue') {
          if (this.items[i].name != 'Parking Pass') {
            if (this.items[i].quality > 0) {
              if (this.items[i].name != 'Sledge Hammer') {
                this.items[i].quality = this.items[i].quality - 1
              }
            }
          } else {
            this.items[i].quality = this.items[i].quality - this.items[i].quality
          }
        } else {
          if (this.items[i].quality < 50) {
            this.items[i].quality = this.items[i].quality + 1
          }
        }
      }
    }

    return this.items;
  }

}

/**
 * Vitest insource testing - https://vitest.dev/guide/in-source
 * 
 * WARNING - Do NOT modify this code
 * You are allowed to uncomment the other test case
 */

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest

  it('FiveDays', async () => {
    const items = [
      new Item("Safety Vest", 10, 20),
      new Item("Glue", 2, 0),
      new Item("Superglue", 5, 7),
      new Item("Sledge Hammer", 0, 80),
      new Item("Sledge Hammer", -1, 80),
      new Item("Parking Pass", 15, 20),
      new Item("Parking Pass", 10, 49),
      new Item("Parking Pass", 5, 49),
      // this item does not work properly yet
      new Item("Bottle of water", 3, 6)
    ];

    const store = new HardwareStore(items);

    let days: number = 5;
    let output: string = "OMGHAI!\n";
    for (let i = 0; i < days + 1; i++) {
      output += "-------- day " + i + " --------\n";
      output += "name, sellIn, quality\n";

      items.forEach(element => {
        output += `${element.name}, ${element.sellIn}, ${element.quality}\n`
      });
      output += "\n";
      store.updateQuality();
    }

    await expect(output).toMatchFileSnapshot('../../../texttests/5days.txt')
  });

  // it('ThirtyDays', () => {
  //   const items = [
  //     new Item("Safety Vest", 10, 20),
  //     new Item("Glue", 2, 0),
  //     new Item("Superglue", 5, 7),
  //     new Item("Sledge Hammer", 0, 80),
  //     new Item("Sledge Hammer", -1, 80),
  //     new Item("Parking Pass", 15, 20),
  //     new Item("Parking Pass", 10, 49),
  //     new Item("Parking Pass", 5, 49),
  //     // this item does not work properly yet
  //     new Item("Bottle of water", 3, 6)
  //   ];

  //   const store = new HardwareStore(items);

  //   let days: number = 30;
  //   let output: string = "OMGHAI!\n";
  //   for (let i = 0; i < days + 1; i++) {
  //     output += "-------- day " + i + " --------\n";
  //     output += "name, sellIn, quality\n";

  //     items.forEach(element => {
  //       output += `${element.name}, ${element.sellIn}, ${element.quality}\n`
  //     });
  //     output += "\n";
  //     store.updateQuality();
  //   }

  //   expect(output).toMatchFileSnapshot('../../../texttests/30days.txt')
  // });
}
