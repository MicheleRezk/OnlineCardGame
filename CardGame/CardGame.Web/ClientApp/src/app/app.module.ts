import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

//Components
import { AppComponent } from './app.component';
import { CardGameComponent } from './components/card-game/card-game.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

import { NavMenuComponent } from './components/nav-menu/nav-menu.component';

//Services
import { Config } from './services/config.service';
import { GameService } from './services/game.service';
import { GameResultsComponent } from './components/game-results/game-results.component';

@NgModule({
  declarations: [
    AppComponent,
    CardGameComponent,
    GameResultsComponent,
    NavMenuComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
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
