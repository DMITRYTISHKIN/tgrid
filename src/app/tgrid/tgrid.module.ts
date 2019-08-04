import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TgridComponent } from './tgrid.component';
import { TgridColumnComponent } from './tgrid-column/tgrid-column.component';
import { TgridFilterComponent } from './tgrid-filter/tgrid-filter.component';
import { TgridOverlayComponent } from './tgrid-overlay/tgrid-overlay.component';
import { PaginatorModule } from '../paginator';

@NgModule({
  exports: [TgridComponent, TgridColumnComponent],
  declarations: [TgridComponent, TgridColumnComponent, TgridFilterComponent, TgridOverlayComponent],
  imports: [
    CommonModule,
    PaginatorModule
  ],
  entryComponents: [
    TgridFilterComponent,
    TgridOverlayComponent
  ]
})
export class TgridModule { }
