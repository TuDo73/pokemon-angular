import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { PokemonItem } from '@app/@shared/models/pokemon';
import { PokemonService } from '@app/@shared/services/pokemon.service';
import { LoadingService } from '@app/@shared/services/loading.service';
import { environment } from '@env/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  pokemonList: PokemonItem[] = []; // State for show in view
  filteredPokemon: PokemonItem[] = []; // State for filter data
  fetchPokemonSubs: Subscription | undefined;
  fetchPokemonParam = { limit: 20, offset: 0 };
  totalItem = 0;
  totalTablePage = 0;
  currentTablePage = 1;

  constructor(
    private pokemonService: PokemonService,
    private loader: LoadingService
  ) {}

  getPokemonList() {
    this.loader.setLoading(true);
    this.fetchPokemonSubs = this.pokemonService
      .fetchPokemon(this.fetchPokemonParam.limit, this.fetchPokemonParam.offset)
      .subscribe({
        next: (response) => {
          this.setTotal(response.count);
          this.convertPokemonItem(response.results);
        },
        error: (err) => console.log({ err }),
        complete: () => this.loader.setLoading(false),
      });
  }

  setTotal(value: number) {
    this.totalItem = value;
    this.totalTablePage = Math.ceil(value / 20);
  }

  navigateTablePageByRequest(value: number) {
    if (!value) return;

    this.currentTablePage = value;
    this.fetchPokemonParam = {
      ...this.fetchPokemonParam,
      offset: (this.currentTablePage - 1) * 20,
    };
    this.getPokemonList();
  }

  navigateTablePage(value: number) {
    if (!value) return;

    this.currentTablePage = value;
    const offset = (this.currentTablePage - 1) * 20;
    this.pokemonList = this.filteredPokemon.slice(offset, offset + 20);
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
        image: `${environment.imageUrl}/${this.getPokemonId(
          item.url || '1'
        )}.png`,
        url: item.url,
        name: item.name,
      };

      return pokemon;
    });

    this.pokemonList = convertData;
  }

  handleSearchPokemon(searchTerm: string) {
    this.navigateTablePage(1);
    const allPokemon = this.pokemonService.getAllPokemon();

    if (!searchTerm) {
      this.filteredPokemon = allPokemon;
      this.pokemonList = this.filteredPokemon.slice(0, 20);
      this.setTotal(this.filteredPokemon.length);
      return;
    }

    const regexSearchTerm = new RegExp(
      searchTerm.replace(new RegExp('\\\\', 'g'), '\\\\'),
      'gi'
    );
    const matchedPokemon: PokemonItem[] = [];
    allPokemon.forEach((pokemon) => {
      if (regexSearchTerm.test(pokemon.name)) {
        matchedPokemon.push(pokemon);
      }
    });
    this.filteredPokemon = matchedPokemon;
    this.pokemonList = this.filteredPokemon.slice(0, 20);
    this.setTotal(this.filteredPokemon.length);
  }

  getAllPokemon() {
    this.loader.setLoading(true);
    this.fetchPokemonSubs = this.pokemonService
      .fetchPokemon(2000, 0)
      .pipe(
        map((res) => {
          const convertData: PokemonItem[] = res.results.map((item) => {
            return {
              id: this.getPokemonId(item.url || '1'),
              image: `${environment.imageUrl}/${this.getPokemonId(
                item.url || '1'
              )}.png`,
              url: item.url,
              name: item.name,
            };
          });
          return convertData;
        })
      )
      .subscribe({
        next: (response) => {
          this.setTotal(response.length);
          this.pokemonService.setAllPokemon(response);
          this.filteredPokemon = response;
          this.pokemonList = this.filteredPokemon.slice(0, 20);
        },
        error: (err) => console.log({ err }),
        complete: () => this.loader.setLoading(false),
      });
  }

  ngOnInit(): void {
    this.getAllPokemon();
  }

  ngOnDestroy(): void {
    this.fetchPokemonSubs && this.fetchPokemonSubs.unsubscribe();
  }
}
