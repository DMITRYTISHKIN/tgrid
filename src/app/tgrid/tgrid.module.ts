import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TGridComponent } from './tgrid.component';
import { TGridColumnComponent } from './tgrid-column/tgrid-column.component';
import { TgridFilterComponent } from './tgrid-filter/tgrid-filter.component';
import { TgridOverlayComponent } from './tgrid-overlay/tgrid-overlay.component';
import { PaginatorModule } from '../paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TGridDetailComponent } from './tgrid-detail/tgrid-detail.component';

@NgModule({
  exports: [TGridComponent, TGridColumnComponent],
  declarations: [TGridComponent, TGridColumnComponent, TgridFilterComponent, TgridOverlayComponent, TGridDetailComponent],
  imports: [
    CommonModule,
    PaginatorModule,
    BrowserAnimationsModule
  ],
  entryComponents: [
    TgridFilterComponent,
    TgridOverlayComponent
  ]
})
export class TgridModule { }
