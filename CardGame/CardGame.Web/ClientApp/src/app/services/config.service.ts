/*Client App Configuration Settings*/
/*Contains Settings like Backend Services Urls*/

import { Injectable, Inject } from '@angular/core';

@Injectable()
export class Config {

  public readonly BACKEND: any = {
    GAME: {
      GET: "/api/game/get-new-card-game"
    }
  };

  constructor() {
    
  }
  
}
