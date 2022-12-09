import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonItem } from '@app/@shared/models/pokemon';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @Input() pokemonList: PokemonItem[] = [];
  displayedMatColumns = ['id', 'image', 'name', 'url', 'view'];

  constructor(private router: Router) {}

  goToDetailPage(id: string) {
    this.router.navigate([`/detail/${id}`]);
  }
}
