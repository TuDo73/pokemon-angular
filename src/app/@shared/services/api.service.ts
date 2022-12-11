import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';

const POKEMON_ENDPOINT = 'https://pokeapi.co/api/v2';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private headers: HttpHeaders;

  constructor(private httpClient: HttpClient) {
    this.headers = new HttpHeaders().set('Content-Type', 'application/json');
  }

  get<T = any>(
    url: string,
    params: any = {},
    options: any = {}
  ): Observable<T> {
    return this.request<T>('get', url, {
      headers: this.headers,
      ...options,
      params,
    });
  }

  request<T = any>(
    method: string,
    url: string,
    options: any = {}
  ): Observable<any> {
    return new Observable((observer: Subscriber<any>): void => {
      this.httpClient
        .request<T>(method, `${POKEMON_ENDPOINT}${url}`, options)
        .subscribe({
          next: (response: HttpEvent<T>) => {
            observer.next(response);
            observer.complete();
          },
          error: (error: any) => {
            observer.error(error);
            observer.complete();
          },
        });
    });
  }
}
