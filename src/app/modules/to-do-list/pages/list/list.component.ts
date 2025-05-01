import { Component, signal } from '@angular/core';
import { InputAddItemComponent } from '../../components/input-add-item/input-add-item.component';
import { InputListItemComponent } from '../../components/input-list-item/input-list-item.component';
import Swal from 'sweetalert2';
// Interfaces
import { IListItems } from '../../interfaces/IListItems.interface';
// Enums
import { ElocalStorage } from '../../enum/ElocalStorage.enum';

@Component({
  selector: 'app-list',
  imports: [InputAddItemComponent, InputListItemComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  addItem = signal(true);
  #setListItems = signal<IListItems[]>(this.#parseItems());
  getListItems = this.#setListItems.asReadonly();

  #parseItems() {
    let list = localStorage.getItem(ElocalStorage.MY_LIST);
    list = list !== 'undefined' && list ? list : '[]'
    return JSON.parse(list);
  }

  #updateLocalStorage() {
    return localStorage.setItem(
      ElocalStorage.MY_LIST,
      JSON.stringify(this.#setListItems)
    );
  }

  getInputAndAddItem(value: IListItems) {
    localStorage.setItem(
      ElocalStorage.MY_LIST,
      JSON.stringify([...this.#setListItems(), value])
    );

    return this.#setListItems.set(this.#parseItems());
  }

  deleteAllItems() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete all!',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem(ElocalStorage.MY_LIST);
        return this.#setListItems.set(this.#parseItems());
      }
    });
  }

  listItemsStage(value: 'pending' | 'completed') {
    return this.getListItems().filter((res: IListItems) => {
      return value === 'pending' ? !res.checked : res.checked;
    });
  }

  updateItemCheckBox(newItem: { id: string; checked: boolean }) {
    this.#setListItems.update((oldValue: IListItems[]) => {
      oldValue.filter((item) => {
        if (item.id === newItem.id) {
          item.checked = newItem.checked;
        }
        return item;
      });

      return oldValue;
    });

    this.#updateLocalStorage();
  }

  updateItemValue(newItem: { id: string; value: string }) {
    this.#setListItems.update((oldValue: IListItems[]) => {
      oldValue.filter((item) => {
        if (item.id === newItem.id) {
          item.value = newItem.value;
        }
        return item;
      });

      return oldValue;
    });

    this.#updateLocalStorage();
  }

  deleteItem(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.#setListItems.update((oldValue: IListItems[]) => {
          return oldValue.filter((item) => item.id !== id);
        });
        this.#updateLocalStorage();
      }
    });
  }
}
