import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StarshipService {
  private apiUrl = 'https://swapi.dev/api/starships';
  private imgUrl: string = 'https://starwars-visualguide.com/assets/img/starships/';

  constructor(private http: HttpClient) {}

  getStarships(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getStarship(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  getStarshipImgUrl(id: number): string {
    return `${this.imgUrl}${id}.jpg`;
  }
}
