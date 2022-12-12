import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  @Output() onSearch = new EventEmitter<string>();
  searchTerm = new FormControl('');

  onChangeSearch() {
    this.onSearch.emit(this.searchTerm.value || '');
  }
}
