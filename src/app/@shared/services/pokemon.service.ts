import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PokemonData, PokemonResponse } from '../models/pokemon';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(private apiService: ApiService) {}

  fetchPokemon(limit = 20, offset = 0): Observable<PokemonData> {
    const url = `/pokemon?limit=${limit}&offset=${offset}`;
    return this.apiService.get<PokemonData>(url);
  }

  fetchPokemonDetail(id: string): Observable<PokemonResponse> {
    const url = `/pokemon/${id}`;
    return this.apiService.get<PokemonResponse>(url);
  }
}
