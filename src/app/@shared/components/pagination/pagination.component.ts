import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  @Input() totalItem = 0;
  @Input() totalTablePage = 0;
  @Input() currentTablePage = 1;
  @Output() onNavigateTablePage = new EventEmitter<number>();

  getMiddlePagination(): number[] {
    const totalPages = [...Array(this.totalTablePage)].map(
      (item, index) => index + 1
    );

    if (this.totalTablePage < 6)
      return totalPages.slice(1, this.totalTablePage - 1);

    // over second half
    if (this.currentTablePage > this.totalTablePage - 3)
      return totalPages.slice(this.totalTablePage - 4, this.totalTablePage - 1);

    // over first half
    if (this.currentTablePage > 3)
      return totalPages.slice(
        this.currentTablePage - 2,
        this.currentTablePage + 1
      );

    // default
    return totalPages.slice(1, 4);
  }

  navigateTablePage(value: number) {
    this.onNavigateTablePage.emit(value);
  }
}
