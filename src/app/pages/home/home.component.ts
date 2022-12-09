import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { POKEMON_IMAGE_URL } from '@app/@shared/helper/constant';
import { PokemonItem } from '@app/@shared/models/pokemon';
import { PokemonService } from '@app/@shared/services/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  pokemonList: PokemonItem[] = [];
  fetchPokemonSubs: Subscription | undefined;
  fetchPokemonParam = { limit: 20, offset: 0 };
  totalItem = 0;
  totalTablePage = 0;
  currentTablePage = 1;

  constructor(private pokemonService: PokemonService, private router: Router) {}

  getPokemonList() {
    this.fetchPokemonSubs = this.pokemonService
      .fetchPokemon(this.fetchPokemonParam.limit, this.fetchPokemonParam.offset)
      .subscribe((response) => {
        this.setTotal(response.count);
        this.convertPokemonItem(response.results);
      });
  }

  setTotal(value: number) {
    this.totalItem = value;
    this.totalTablePage = Math.ceil(value / 20);
  }

  navigateTablePage(value: number) {
    if (!value) return;

    this.currentTablePage = value;
    this.fetchPokemonParam = {
      ...this.fetchPokemonParam,
      offset: (this.currentTablePage - 1) * 20,
    };

    this.getPokemonList();
  }

  getPokemonId(url: string) {
    const arr = url.split('/');
    const id = arr[arr.length - 2];
    return id;
  }

  convertPokemonItem(data: PokemonItem[]) {
    const convertData: PokemonItem[] = data.map((item) => {
      const pokemon = {
        id: this.getPokemonId(item.url || '1'),
        image: `${POKEMON_IMAGE_URL}/${this.getPokemonId(item.url || '1')}.png`,
        url: item.url,
        name: item.name,
      };

      return pokemon;
    });

    this.pokemonList = convertData;
  }

  ngOnInit(): void {
    this.getPokemonList();
  }

  ngOnDestroy(): void {
    this.fetchPokemonSubs && this.fetchPokemonSubs.unsubscribe();
  }
}