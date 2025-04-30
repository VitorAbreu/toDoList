import { Component, signal } from '@angular/core';
import { InputAddItemComponent } from '../../components/input-add-item/input-add-item.component';
import { IListItems } from '../../../interfaces/IListItems.interface';
import { InputListItemComponent } from '../../components/input-list-item/input-list-item.component';

@Component({
  selector: 'app-list',
  imports: [InputAddItemComponent, InputListItemComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  addItem = signal(true);
  #setListItems = signal<IListItems[]>(this.#parseItems());
  getListItems = this.#setListItems.asReadonly();

  #parseItems() {
    return JSON.parse(localStorage.getItem('@my-list') || '[]');
  }

  getInputAndAddItem(value: IListItems) {
    localStorage.setItem(
      '@my-list', JSON.stringify([...this.#setListItems(),value])
    );

    return this.#setListItems.set(this.#parseItems());
  }

  deleteAllItems() {
    localStorage.removeItem('@my-list');
    return this.#setListItems.set(this.#parseItems());
  }

  listItemsStage(value: 'pending' | 'completed') {
    return this.getListItems().filter((res: IListItems) => {
      return value === 'pending' ? !res.checked : res.checked;
    })
  }

  updateItemCheckBox(newItem: {id: string, checked: boolean}) {
    this.#setListItems.update((oldValue: IListItems[]) => {
      oldValue.filter(item => {
        if(item.id === newItem.id) {
          item.checked = newItem.checked;
        }
        return item;
      });

      return oldValue;
    });

    return localStorage.setItem('@my-list', JSON.stringify(this.#setListItems));
  }

  updateItemValue(newItem: {id: string, value: string}) {
    this.#setListItems.update((oldValue: IListItems[]) => {
      oldValue.filter(item => {
        if(item.id === newItem.id) {
          item.value = newItem.value;
        }
        return item;
      });

      return oldValue;
    });

    return localStorage.setItem('@my-list', JSON.stringify(this.#setListItems));
  }

  deleteItem(id: string) {
    this.#setListItems.update((oldValue: IListItems[]) => {
      const deletedItemIndex = oldValue.filter(item => item.id === id);

      if(deletedItemIndex[0])
        oldValue.splice(oldValue.indexOf(deletedItemIndex[0]), 1);

      return oldValue;
    });

    return localStorage.setItem('@my-list', JSON.stringify(this.#setListItems));
  }
}
