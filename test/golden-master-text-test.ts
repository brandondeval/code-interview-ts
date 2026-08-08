// test/golden-master-text-test.ts

import { Item, HardwareStore } from '../app/interview.ts';

console.log("OMGHAI!")

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


const store= new HardwareStore(items);

let days: number = 2;
if (process.argv.length > 2) {
    days = +process.argv[2];
  }

for (let i = 0; i < days + 1; i++) {
  console.log("-------- day " + i + " --------");
  console.log("name, sellIn, quality");
  items.forEach(element => {
    console.log(element.name + ', ' + element.sellIn + ', ' + element.quality);

  });
  console.log();
  store.updateQuality();
}