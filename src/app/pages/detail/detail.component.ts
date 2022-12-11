import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { POKEMON_IMAGE_URL } from '@app/@shared/helper/constant';
import { PokemonItem, PokemonResponse } from '@app/@shared/models/pokemon';
import { LoadingService } from '@app/@shared/services/loading.service';
import { PokemonService } from '@app/@shared/services/pokemon.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit, OnDestroy {
  pokemon: PokemonItem | undefined;
  fetchPokemonSubs: Subscription | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
    private loader: LoadingService
  ) {}

  onClickBack() {
    this.router.navigate(['']);
  }

  convertPokemonDetailData(data: PokemonResponse) {
    const convertData = {
      id: this.route.snapshot.params['id'],
      image: `${POKEMON_IMAGE_URL}/${this.route.snapshot.params['id']}.png`,
      name: data.name,
      weight: data.weight,
      height: data.height,
      experience: data.base_experience,
      ability: data.abilities.length,
      form: data.forms.length,
      gameIndices: data.game_indices.length,
      heldItem: data.held_items.length,
      move: data.moves.length,
    };

    this.pokemon = convertData;
  }

  getPokemonDetail() {
    this.loader.setLoading(true);
    const currentId = this.route.snapshot.params['id'];

    this.fetchPokemonSubs = this.pokemonService
      .fetchPokemonDetail(currentId)
      .subscribe({
        next: (res) => {
          this.convertPokemonDetailData(res);
        },
        error: (err) => console.log({ err }),
        complete: () => this.loader.setLoading(false),
      });
  }

  ngOnInit(): void {
    this.getPokemonDetail();
  }

  ngOnDestroy(): void {
    this.fetchPokemonSubs && this.fetchPokemonSubs.unsubscribe;
  }
}
