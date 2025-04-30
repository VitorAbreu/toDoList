import { Component, input, output } from '@angular/core';
import { IListItems } from '../../../interfaces/IListItems.interface';

@Component({
  selector: 'app-input-list-item',
  imports: [],
  templateUrl: './input-list-item.component.html',
  styleUrl: './input-list-item.component.scss'
})
export class InputListItemComponent {

  inputListItems = input.required<IListItems[]>();
  outputUpdateItemCheckBox = output<{id: string, checked: boolean}>();
  outputUpdateValue = output<{id: string, value: string}>();
  outputDeleteItemButton = output<string>();

  updateItemCheckBox(id: string, checked: boolean) {
    return this.outputUpdateItemCheckBox.emit({id, checked});
  }

  updateItemValue(id: string, value: string) {
    return this.outputUpdateValue.emit({id, value});
  }

  deleteItemButton(id: string) {
    return this.outputDeleteItemButton.emit(id);
  }
}
