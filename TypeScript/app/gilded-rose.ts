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

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      let decrement = 1;
      if (this.items[i].name.includes("Conjured")) {
        decrement = 2;
      }
      switch (this.items[i].name) {
        case 'Aged Brie':
          this.incrementQuality(this.items[i]);
          break;
        case 'Backstage passes to a TAFKAL80ETC concert':
          this.updateBackstageQuality(this.items[i]);
          break;
        case 'Sulfuras, Hand of Ragnaros':
          break;
        default:
          this.decrementQuality(this.items[i], decrement);
          break;
      }

      if (this.items[i].name !== 'Sulfuras, Hand of Ragnaros') {
        this.items[i].sellIn--;
      }

      if (this.items[i].sellIn < 0) {
        switch (this.items[i].name) {
          case 'Aged Brie':
            this.incrementQuality(this.items[i]);
            break;
          case 'Backstage passes to a TAFKAL80ETC concert':
            this.items[i].quality = 0;
            break;
          case "Sulfuras, Hand of Ragnaros":
            break;
          default:
            this.decrementQuality(this.items[i], decrement);
            break;
        }
      }
    }

    return this.items;
  }

  private decrementQuality(item: Item, factor:number = 1) {
    if (item.quality > 0) {
      item.quality-= factor;
    }
  }

  private incrementQuality(item: Item) {
    if (item.quality < 50) {
      item.quality++;
    }
  }

  private updateBackstageQuality(item: Item) {
    this.incrementQuality(item);
    if (item.sellIn < 11) {
      this.incrementQuality(item);
    }
    if (item.sellIn < 6) {
      this.incrementQuality(item);
    }
  }
}