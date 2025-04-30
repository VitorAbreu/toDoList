import { ChangeDetectorRef, Component, ElementRef, inject, input, output, ViewChild } from '@angular/core';
import { IListItems } from '../../interfaces/IListItems.interface';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-input-add-item',
  imports: [NgClass],
  templateUrl: './input-add-item.component.html',
  styleUrl: './input-add-item.component.scss'
})
export class InputAddItemComponent {

  #cdr = inject(ChangeDetectorRef);
  outputAddListItems = output<IListItems>();
  @ViewChild("inputValue") inputText!: ElementRef;
  inputListItems = input.required<IListItems[]>();

  focusAndAddItem(value: string) {
    if(value) {
      this.#cdr.detectChanges();
      this.inputText.nativeElement.value = '';

      const currentDate = new Date();
      const timestamp = currentDate.getTime();
      const id = `ID ${timestamp}`;

      this.outputAddListItems.emit({
        id,
        checked: false,
        value
      });

      return this.inputText.nativeElement.focus();
    }
  }
}
