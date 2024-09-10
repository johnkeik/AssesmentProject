import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ItemHandlerService, PriceMap } from './item-handler.service';
import { Item, Size } from './data';
import { ItemComponent } from './item/item.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ItemComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private itemService = inject(ItemHandlerService);
  prices:PriceMap = {};
  items: Item[] = [];
  sizes: Size[] = [];
  
  ngOnInit(): void {
    this.prices = this.itemService.initalPriceMap();
    this.items = this.itemService.getItems();
    this.sizes = this.itemService.getSizes();

  }

  getSizeName(sizeId: number): string {
    return this.sizes.find(size => size.sizeId === sizeId)?.name || '';
  }


}
