import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import * as PLAYERDATA from './players.json';

@Injectable({
  providedIn: 'root'
})
export class PlayerDataService {
  apiUrl: string = 'https://mocki.io/v1/4f1e7b0d-8859-43cf-8476-f0d50ea0002c';

  constructor(private http: HttpClient) { }

  // getPlayers(): any {
  //   return of(PLAYERDATA).pipe(delay(500));
  // }

  // getGamesData(): Observable<any> {
  //   return this.http.get(this.apiUrl);
  // }

  getCombinedPlayerData(): Observable<any[]> {
    const playerData = of(PLAYERDATA).pipe(delay(500));
    const gamesData = this.http.get(this.apiUrl);
    const combined =  forkJoin([playerData, gamesData]);
    return combined;
  }

}
