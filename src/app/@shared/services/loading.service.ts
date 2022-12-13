import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private isLoading = false;

  constructor() {}

  getLoading(): boolean {
    return this.isLoading;
  }

  setLoading(value: boolean) {
    this.isLoading = value;
  }
}
