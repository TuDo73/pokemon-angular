export type PokemonItem = {
  id?: string;
  image?: string;
  name: string;
  url?: string;
  weight?: number;
  height?: number;
  experience?: number;
  ability?: number;
  form?: number;
  gameIndices?: number;
  heldItem?: number;
  move?: number;
};

export type PokemonResponse = {
  name: string;
  weight: number;
  height: number;
  base_experience: number;
  abilities: any[];
  forms: any[];
  game_indices: any[];
  held_items: any[];
  moves: any[];
};

export type PokemonData = {
  count: number;
  next: string;
  previous: string;
  results: PokemonItem[];
};
