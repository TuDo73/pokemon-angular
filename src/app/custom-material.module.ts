import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [MatToolbarModule, MatTableModule, MatButtonModule, MatIconModule],
})
export class CustomMaterial {}
