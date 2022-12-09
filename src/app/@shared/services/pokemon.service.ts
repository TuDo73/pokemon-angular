import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PokemonData, PokemonResponse } from '../models/pokemon';

const POKEMON_ENDPOINT = 'https://pokeapi.co/api/v2';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(private httpClient: HttpClient) {}

  fetchPokemon(limit = 20, offset = 0): Observable<PokemonData> {
    const url = `${POKEMON_ENDPOINT}/pokemon?limit=${limit}&offset=${offset}`;
    return this.httpClient.get<PokemonData>(url);
  }

  fetchPokemonDetail(id: string): Observable<PokemonResponse> {
    const url = `${POKEMON_ENDPOINT}/pokemon/${id}`;
    return this.httpClient.get<PokemonResponse>(url);
  }
}
