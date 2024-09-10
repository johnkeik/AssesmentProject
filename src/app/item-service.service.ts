import { Injectable } from '@angular/core';
import { Item, itemPrices, items, itemSizes, Price, Size } from './data';

@Injectable({
  providedIn: 'root'
})
export class ItemServiceService {

  constructor() { }

  getItems(): Item[] {
    return items;
  }

  getPrices(): Price[]{
    return itemPrices;
  }

  getSizes(): Size[] {
    return itemSizes;
  }
}
