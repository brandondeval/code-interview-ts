// it('Match Text File Output: FiveDays', async () => {
//     const items = [
//       new Item("Safety Vest", 10, 20),
//       new Item("Glue", 2, 0),
//       new Item("Superglue", 5, 7),
//       new Item("Sledge Hammer", 0, 80),
//       new Item("Sledge Hammer", -1, 80),
//       new Item("Parking Pass", 15, 20),
//       new Item("Parking Pass", 10, 49),
//       new Item("Parking Pass", 5, 49),
//       // this item does not work properly yet
//       new Item("Bottle of water", 3, 6)
//     ];

//     const store = new HardwareStore(items);

//     let days: number = 5;
//     let output: string = "OMGHAI!\n";
//     for (let i = 0; i < days + 1; i++) {
//       output += "-------- day " + i + " --------\n";
//       output += "name, sellIn, quality\n";

//       items.forEach(element => {
//         output += `${element.name}, ${element.sellIn}, ${element.quality}\n`
//       });
//       output += "\n";
//       store.updateQuality();
//     }

//     await expect(output).toMatchFileSnapshot('../../../texttests/5days.txt')
//   });