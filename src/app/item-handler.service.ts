import { computed, Injectable, signal } from '@angular/core';
import { Item, itemPrices, items, itemSizes, Price, Size } from './data';



export interface PriceMap {
  [key: number]: PriceEntry[]
}

export interface PriceEntry {
  sizeId: number;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class ItemHandlerService {
  private _initialPriceMap = signal<PriceMap>({});
  public initalPriceMap = computed(() => this._initialPriceMap());

  getItems(): Item[] {
    return items;
  }

  getPrices(): Price[]{
    return itemPrices;
  }

  getSizes(): Size[] {
    return itemSizes;
  }

  constructor() {
    const tempPrices:PriceMap = {}
    items.forEach(item => {
      tempPrices[item.itemId] = itemPrices
        .filter(price => price.itemId === item.itemId)
        .map(price => ({ sizeId: price.sizeId, price: price.price }));
    });

    this._initialPriceMap.set(JSON.parse(JSON.stringify(tempPrices)));
   }

}
