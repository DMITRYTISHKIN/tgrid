import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TGridComponent } from './tgrid.component';
import { TGridColumnComponent } from './tgrid-column/tgrid-column.component';
import { TgridFilterComponent } from './tgrid-filter/tgrid-filter.component';
import { TgridOverlayComponent } from './tgrid-overlay/tgrid-overlay.component';
import { PaginatorModule } from '../paginator';

@NgModule({
  exports: [TGridComponent, TGridColumnComponent],
  declarations: [TGridComponent, TGridColumnComponent, TgridFilterComponent, TgridOverlayComponent],
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
