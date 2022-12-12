import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PokemonData, PokemonItem, PokemonResponse } from '../models/pokemon';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  allPokemon: PokemonItem[] = [];

  constructor(private apiService: ApiService) {}

  getAllPokemon() {
    return this.allPokemon;
  }

  setAllPokemon(data: PokemonItem[]) {
    this.allPokemon = data;
  }

  fetchPokemon(limit = 20, offset = 0): Observable<PokemonData> {
    const url = `/pokemon?limit=${limit}&offset=${offset}`;
    return this.apiService.get<PokemonData>(url);
  }

  fetchPokemonDetail(id: string): Observable<PokemonResponse> {
    const url = `/pokemon/${id}`;
    return this.apiService.get<PokemonResponse>(url);
  }
}
