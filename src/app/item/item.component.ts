import { Component, ElementRef, inject, input, ViewChild } from '@angular/core';
import { Item, items, Size } from '../data';
import { ItemHandlerService, PriceMap } from '../item-handler.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss'
})
export class ItemComponent {
  item = input.required<Item>();
  priceMap = input.required<PriceMap>();
  sizes = input.required<Size[]>();
  itemService = inject(ItemHandlerService);
  testPriceMap = JSON.parse(JSON.stringify(this.itemService.initalPriceMap()));
  showReset = false;
  expanded = false;
  checkboxDisabledStates: { [sizeId: number]: boolean } = {};

  getSizeName(sizeId: number): string {
    return this.sizes().find(size => size.sizeId === sizeId)?.name || '';
  }

  resetValues() {
    this.testPriceMap[this.item().itemId] = JSON.parse(JSON.stringify(this.itemService.initalPriceMap()[this.item().itemId]));
    this.checkboxDisabledStates = {}
    this.showReset = false;
  }

  onPriceInput(event: Event, sizeId: number): void {
    const inputElement = event.target as HTMLInputElement;
    let value = inputElement.value;
    // Remove all non-numeric characters except for decimal point
    value = value.replace(/[^0-9.]/g, '');

    // Ensure only one decimal point is allowed
    const parts = value.split('.');
    if (parts.length > 2) {
      value = parts[0] + '.' + parts.slice(1).join('');
    }

    inputElement.value = value;

    // Update the price map with the cleaned value
    const numericValue = parseFloat(value);
    console.log(numericValue)
    if (!isNaN(numericValue)) {
      this.testPriceMap[this.item().itemId][sizeId].price = numericValue;
    } else {
      this.testPriceMap[this.item().itemId][sizeId].price = 0;
    }

    this.showReset = true;
  }

  handleCheckbox(event: any, sizeId: number) {
    this.checkboxDisabledStates[sizeId] = !event.target.checked;
    if(event.target.checked) {
      this.testPriceMap[this.item().itemId][sizeId] = JSON.parse(JSON.stringify(this.itemService.initalPriceMap()[this.item().itemId][sizeId]));
    } else {
      this.testPriceMap[this.item().itemId][sizeId].price = 0;
    }
    this.showReset = true;
  }

  handleExpansion() {
    this.expanded = !this.expanded;

  }

  isInputDisabled(sizeId: number) {
    return this.checkboxDisabledStates[sizeId];
  }
}
