import { Component, input } from '@angular/core';
import { IListItems } from '../../../interfaces/IListItems.interface';

@Component({
  selector: 'app-input-list-item',
  imports: [],
  templateUrl: './input-list-item.component.html',
  styleUrl: './input-list-item.component.scss'
})
export class InputListItemComponent {

  inputListItems = input.required<IListItems[]>();
}
