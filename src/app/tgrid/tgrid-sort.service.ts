import { Injectable } from '@angular/core';
import { TGridItem } from './models/tgrid-item';
import { TGridSortDirection } from './models/tgrid-sort-direction';

@Injectable()
export class TGridSortService {
  public data: TGridItem[];

  constructor() { }

  public initializeData(data: TGridItem[], sortColumn: string, sortDirection: TGridSortDirection, original: TGridItem[]): TGridItem[] {
    this.data = [...original];

    if (sortColumn && sortDirection) {
      this.data = this.applySort(this.data, sortColumn, sortDirection, this.data);
      return this.applySort(data, sortColumn, sortDirection, data);
    }

    return this.data;
  }

  public applySort(items: TGridItem[], column: string, direction: TGridSortDirection, originItems: TGridItem[]): TGridItem[] {
    if (direction === TGridSortDirection.None) {
      return (items = [...originItems]);
    }

    if (direction === TGridSortDirection.Asc) {
      items.sort((a, b) => {
        if (a.data[column] < b.data[column]) {
          return -1;
        }
        if (a.data[column] > b.data[column]) {
          return 1;
        }

        return 0;
      });
    }

    if (direction === TGridSortDirection.Desc) {
      items.sort((a, b) => {
        if (a.data[column] < b.data[column]) {
          return 1;
        }
        if (a.data[column] > b.data[column]) {
          return -1;
        }

        return 0;
      });
    }

    return items;
  }

  public getSortDirection(current: TGridSortDirection, key: string, column: string): TGridSortDirection {
    if (key !== column) {
      return TGridSortDirection.Asc;
    }

    switch (current) {
      case TGridSortDirection.Asc:
        return TGridSortDirection.Desc;
      case TGridSortDirection.Desc:
        return TGridSortDirection.None;
      default:
        return TGridSortDirection.Asc;
    }
  }
}
