import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TgridModule } from './tgrid/tgrid.module';
import { ScrollDirective } from './directives/scroll.directive';
import { ScrollViewComponent } from './scroll-view/scroll-view.component';

@NgModule({
  declarations: [
    AppComponent,
    ScrollDirective,
    ScrollViewComponent
  ],
  imports: [
    BrowserModule,
    TgridModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
