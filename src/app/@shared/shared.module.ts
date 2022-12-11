import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { LayoutComponent } from './components/layout/layout.component';
import { CustomMaterial } from '@app/custom-material.module';
import { UppercaseFirstLetterPipe } from './pipe/uppercase-first-letter.pipe';
import { TableComponent } from './components/table/table.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { LoadingComponent } from './components/loading/loading.component';

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    UppercaseFirstLetterPipe,
    TableComponent,
    PaginationComponent,
    LoadingComponent,
  ],
  exports: [
    LayoutComponent,
    HeaderComponent,
    UppercaseFirstLetterPipe,
    TableComponent,
    PaginationComponent,
    LoadingComponent
  ],
  imports: [CommonModule, CustomMaterial],
})
export class SharedModule {}
