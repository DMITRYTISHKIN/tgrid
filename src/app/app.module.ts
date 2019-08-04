import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TgridModule } from './tgrid/tgrid.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    TgridModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
