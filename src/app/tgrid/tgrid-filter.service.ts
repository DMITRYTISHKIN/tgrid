import { Injectable, ComponentFactoryResolver, Injector, ApplicationRef, ComponentRef, Renderer2, QueryList } from '@angular/core';
import { TGridItem } from './models/tgrid-item';
import { TgridFilterComponent } from './tgrid-filter/tgrid-filter.component';
import { TgridColumnComponent } from './tgrid-column/tgrid-column.component';
import { TGridFilter } from './models/tgrid-filter';
import { TgridOverlayComponent } from './tgrid-overlay/tgrid-overlay.component';

@Injectable()
export class TgridFilterService {

  public data: TGridItem[];
  private _originalData: TGridItem[];

  constructor(
    private _factory: ComponentFactoryResolver,
    private _injector: Injector,
    private _appRef: ApplicationRef,
    private _renderer: Renderer2
  ) { }

  public initializeData(data: TGridItem[], columns: QueryList<TgridColumnComponent>, original: TGridItem[]): TGridItem[] {
    this.data = [...original];
    this._originalData = [...original];

    if (columns) {
      this.data = this._applyFilters(this.data, columns);
      return this._applyFilters(data, columns);
    }
    return this.data;
  }

  public createFilterPopover(column: TgridColumnComponent, element: HTMLElement): ComponentRef<TgridFilterComponent> {
    const overlayRef = this._createOverlay();
    const filterRef = this._createFilter(overlayRef);

    filterRef.instance.dataSource = column.filter;
    const rect = element.getBoundingClientRect();
    this._renderer.setStyle(filterRef.location.nativeElement, 'left', `${rect.left}px`);
    this._renderer.setStyle(filterRef.location.nativeElement, 'top', `${rect.top + rect.height}px`);

    filterRef.instance.applyFilter.subscribe((filter: TGridFilter[]) => {
      this.data = this.applyFilter(this._originalData, column.key, filter);
      this._destroy(overlayRef, filterRef);
    });

    filterRef.instance.resetFilter.subscribe(() => {
      this.data = [...this._originalData];
      this._destroy(overlayRef, filterRef);
    });

    overlayRef.instance.click.subscribe((e: MouseEvent) => {
      if (!e.composedPath().find(path => path === filterRef.instance.elementRef.nativeElement)) {
        this._destroy(overlayRef, filterRef);
      }
    });

    return filterRef;
  }

  private _applyFilters(items: TGridItem[], columns: QueryList<TgridColumnComponent>): TGridItem[] {
    const filters = columns.map(column => {
      return {
        column: column.key,
        filterValues: column.filter
          .filter(item => item.checked)
          .map(item => item.key)
      };
    });

    return items.filter(item => {
      return filters.every(filter => this._checkFilter(filter.column, filter.filterValues, item));
    });
  }

  private _checkFilter(key: string, filtersValue: string[], item: TGridItem): boolean {
    if (!filtersValue.length) {
      return true;
    }

    const value = item.data[key];
    if (Array.isArray(value)) {
      return filtersValue.reduce((bool, filterValue) => {
        return bool && value.indexOf(filterValue) > -1;
      }, true);
    }
    return filtersValue.indexOf(value) > -1;
  }

  public applyFilter(items: TGridItem[], key: string, filter: TGridFilter[]): TGridItem[] {
    const filtersValue = filter.filter(item => item.checked).map(item => item.key);

    return items.filter(item => {
      const value = item.data[key];
      if (Array.isArray(value)) {
        return filtersValue.reduce((bool, filterValue) => {
          return bool && value.indexOf(filterValue) > -1;
        }, true);
      }

      return filtersValue.indexOf(value) > -1;
    });
  }

  public generateFilters(data: TGridItem[], column: TgridColumnComponent): TGridFilter[] {
    const filter = this._deserealizeFilter(column.filter);
    console.log(filter);
    return Object.keys(data.reduce((prev, item) => {
      prev[item.data[column.key]] = false;
      return prev;
    }, {})).map(key => new TGridFilter(key, filter[key]));
  }

  private _deserealizeFilter(filter: TGridFilter[]): any {
    return filter.reduce((prev, item) => {
      prev[item.key] = item.checked;
      return prev;
    }, {});
  }

  private _createFilter(overlayRef: ComponentRef<TgridOverlayComponent>): ComponentRef<TgridFilterComponent> {
    const factory = this._factory.resolveComponentFactory(TgridFilterComponent);
    const ref = factory.create(this._injector);
    this._appRef.attachView(ref.hostView);

    this._renderer.appendChild(overlayRef.location.nativeElement, ref.location.nativeElement);
    ref.onDestroy(() => {
      this._appRef.detachView(ref.hostView);
    });

    return ref;
  }

  private _createOverlay(): ComponentRef<TgridOverlayComponent> {
    const factory = this._factory.resolveComponentFactory(TgridOverlayComponent);
    const ref = factory.create(this._injector);
    this._appRef.attachView(ref.hostView);

    this._renderer.appendChild(document.body, ref.location.nativeElement);
    ref.onDestroy(() => {
      this._appRef.detachView(ref.hostView);
    });
    return ref;
  }

  private _destroy(
    overlayRef: ComponentRef<TgridOverlayComponent>,
    filterRef: ComponentRef<TgridFilterComponent>
  ): void {
    overlayRef.instance.click.unsubscribe();
    overlayRef.destroy();
    filterRef.destroy();
  }
}
