import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SelectionComponent } from './components/selection/selection.component';
import { BattleComponent } from './components/battle/battle.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { GameComponent } from './components/game/game.component';
import { MainviewComponent } from './components/mainview/mainview.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SelectionComponent,
    BattleComponent,
    HeaderComponent,
    FooterComponent,
    GameComponent,
    MainviewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
