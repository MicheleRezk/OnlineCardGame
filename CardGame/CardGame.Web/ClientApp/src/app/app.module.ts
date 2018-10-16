import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';

//Components
import { AppComponent } from './app.component';
import { CardGameComponent } from './components/card-game/card-game.component';

//Services
import { Config } from './services/config.service';
import { GameService } from './services/game.service';
import { GameResultsComponent } from './components/game-results/game-results.component';

@NgModule({
  declarations: [
    AppComponent,
    CardGameComponent,
    GameResultsComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ModalModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: CardGameComponent, pathMatch: 'full' }
    ])
  ],
  providers: [
    Config,
    GameService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
