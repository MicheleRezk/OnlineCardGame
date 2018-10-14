import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';


import { Config } from './config.service';
import { Game } from '../models/game.model';
import { strictEqual } from 'assert';

@Injectable()
export class GameService {

  constructor(private _http: HttpClient, private _config: Config) { }

  getNewCardGame(playersCount: number, maxOfRounds: number): Observable<Game> {

    let numberOfRounds: string = 'null';
    if (maxOfRounds != null)
      numberOfRounds = maxOfRounds.toString();

    // Initialize Params Object
    let params = new HttpParams()
      .set('playersCount', playersCount.toString())
      .set('maxOfRounds', numberOfRounds);


    return this._http.get<Game>(this._config.BACKEND.GAME.GET, { params })
      .do(data => console.log('All: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }
  private handleError(err: HttpErrorResponse) {
    console.error(err.message);
    return Observable.throw(err.message);
  }
}
