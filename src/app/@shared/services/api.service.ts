import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable, Subscriber } from 'rxjs';

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
        .request<T>(method, `${environment.pokemonApi}${url}`, options)
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
