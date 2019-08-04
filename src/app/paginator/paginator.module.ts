import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaginatorComponent } from './paginator.component';
import { PaginatorDirective } from './paginator.directive';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    PaginatorComponent
  ],
  declarations: [
    PaginatorComponent,
    PaginatorDirective
  ]
})
export class PaginatorModule { }
