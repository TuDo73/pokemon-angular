import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { LayoutComponent } from './components/layout/layout.component';
import { CustomMaterial } from '@app/custom-material.module';
import { UppercaseFirstLetterPipe } from './pipe/uppercase-first-letter.pipe';
import { TableComponent } from './components/table/table.component';
import { PaginationComponent } from './components/pagination/pagination.component';

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    UppercaseFirstLetterPipe,
    TableComponent,
    PaginationComponent,
  ],
  exports: [
    LayoutComponent,
    HeaderComponent,
    UppercaseFirstLetterPipe,
    TableComponent,
    PaginationComponent,
  ],
  imports: [CommonModule, CustomMaterial],
})
export class SharedModule {}
