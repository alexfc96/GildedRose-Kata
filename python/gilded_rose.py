# -*- coding: utf-8 -*-

class Item:
    def __init__(self, name, sell_in, quality):
        self.name = name
        self.sell_in = sell_in
        self.quality = quality


class GildedRose:
    def __init__(self, items=[]):
        self.items = items

    def update_quality(self):
        for item in self.items:
            if item.name != "Aged Brie" and item.name != "Backstage passes to a TAFKAL80ETC concert":
                factor = 1
                if "Conjured" in item.name:
                    factor = 2
                self.decrement_quality(item, factor)
            else:
                self.increment_quality(item)
                if item.name == "Backstage passes to a TAFKAL80ETC concert":
                    self.update_backstage_quality(item)
            if item.name != "Sulfuras, Hand of Ragnaros":
                item.sell_in = item.sell_in - 1
            print(item.name + ", " + str(item.sell_in) + ", " + str(item.quality))

    @staticmethod
    def decrement_quality(item, factor=1):
        if item.quality > 0:
            item.quality -= factor

    @staticmethod
    def increment_quality(item):
        if item.quality < 50:
            item.quality += 1

    def update_backstage_quality(self, item):
        self.increment_quality(item)
        if item.sell_in < 11:
            self.increment_quality(item)
        if item.sell_in < 6:
            self.increment_quality(item)
