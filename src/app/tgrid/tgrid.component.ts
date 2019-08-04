import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  ContentChildren,
  QueryList,
  AfterViewInit,
  Output,
  EventEmitter,
  ViewChild,
  ViewContainerRef,
  Renderer2
} from '@angular/core';
import { TgridColumnComponent } from './tgrid-column/tgrid-column.component';
import { TGridSortDirection } from './models/tgrid-sort-direction';
import { TGridItem } from './models/tgrid-item';
import { TGridSelectMode } from './models/tgrid-select-mode';
import { TGridFilter } from './models/tgrid-filter';
import { TgridFilterService } from './tgrid-filter.service';
import { TgridSortService } from './tgrid-sort.service';

@Component({
  selector: 'app-tgrid',
  templateUrl: './tgrid.component.html',
  styleUrls: ['./tgrid.component.scss'],
  providers: [
    TgridFilterService,
    TgridSortService
  ]
})
export class TgridComponent implements OnInit, OnChanges, AfterViewInit {
  @ContentChildren(TgridColumnComponent) columns: QueryList<TgridColumnComponent>;
  @ViewChild('filterContainer', { static: false, read: ViewContainerRef }) filterContainer: ViewContainerRef;

  @Input() dataSource: any[];
  @Input() idExpr = 'id';
  @Input() sortColumn: string;
  @Input() sortDirection: TGridSortDirection = TGridSortDirection.None;
  @Input() selectMode: TGridSelectMode = TGridSelectMode.None;
  @Input() showDetail = true;
  @Input() singleDetail = true;
  @Input() height: string;

  @Output() sortChange: EventEmitter<TGridSortDirection> = new EventEmitter();
  @Output() selectionChange: EventEmitter<TGridItem[]> = new EventEmitter();

  public _dataSource: TGridItem[];
  public pagerDataSource: TGridItem[];

  public pagerStart: number = 0;
  public pagerEnd: number = 9;

  private _originalDataSource: TGridItem[];

  private _selectedItems: TGridItem[] = [];
  private _openedItems: TGridItem[] = [];

  constructor(
    private _filterService: TgridFilterService,
    private _sortService: TgridSortService,
  ) {}

  ngOnInit() {}

  ngAfterViewInit() { }

  ngOnChanges(changes: SimpleChanges) {
    if ('dataSource' in changes) {
      this._initializeData(changes.dataSource.currentValue);
    }
  }

  public trackByFn(index: number, item: TGridItem): any {
    return item.id || index;
  }

  public onChangePage(page: number): void {
    const per = 9;
    this.pagerStart = (page - 1) * per;
    this.pagerEnd = this.pagerStart + per;
    console.log(this.pagerStart);
    console.log(this.pagerEnd);
  }

  public onClickSort(column: TgridColumnComponent): void {
    if (!column.allowSort) {
      return;
    }

    this.columns.forEach((item) => (item.sort = TGridSortDirection.None));
    this.sortDirection = this._getSortDirection(this.sortDirection, column.key);

    this.sortColumn = column.key;
    column.sort = this.sortDirection;

    this._dataSource = this._sortService.applySort(this._dataSource, this.sortColumn, this.sortDirection, this._filterService.data);
    this._sortService.data = this._sortService.applySort(this._sortService.data, this.sortColumn, this.sortDirection, this._originalDataSource);
  }

  public onClickFilter(e: MouseEvent, column: TgridColumnComponent): void {
    if (!column.allowFilter) {
      return;
    }

    column.filter = this._filterService.generateFilters(this._sortService.data, column);

    const target = (e.currentTarget as HTMLElement).parentElement;
    const componentRef = this._filterService.createFilterPopover(column, target);

    componentRef.instance.applyFilter.subscribe((filter: TGridFilter[]) => {
      this._dataSource = this._filterService.applyFilter(this._sortService.data, column.key, filter);
    });

    componentRef.instance.resetFilter.subscribe(() => {
      this._dataSource = [...this._sortService.data];
    });
  }

  public onClickRow(item: TGridItem, index: number): void {
    if (this.selectMode !== TGridSelectMode.None) {
      this.selectRow(item);
    }

    if (this.showDetail) {
      this.openDetail(item, index);
    }
  }

  public selectRow(item: TGridItem): void {
    switch (this.selectMode) {
      case TGridSelectMode.Single:
        if (this._selectedItems.length && this._selectedItems[0] === item) {
          item.selected = false;
          this._selectedItems.pop();
        } else if (this._selectedItems.length) {
          this._selectedItems[0].selected = false;
          item.selected = true;
          this._selectedItems.splice(0, 1, item);
        } else {
          item.selected = true;
          this._selectedItems.push(item);
        }

        return;
      case TGridSelectMode.Multiple:
        const index = this._selectedItems.indexOf(item);
        if (index > -1) {
          this._selectedItems.splice(index, 1);
          item.selected = false;
        } else {
          this._selectedItems.push(item);
          item.selected = true;
        }

        return;
    }
  }

  public openDetail(item: TGridItem, index: number): void {
    if (this.singleDetail) {
      if (this._openedItems.indexOf(item) > -1) {
        item.expand = false;
        this._openedItems.pop();
        return;
      }

      if (this._openedItems.length) {
        const prev = this._openedItems.pop();
        prev.expand = false;
      }

      item.expand = true;
      this._openedItems.push(item);
    } else {
      const prevIndex = this._openedItems.indexOf(item);
      if (prevIndex > -1) {
        item.expand = false;
        this._openedItems.splice(prevIndex, 1);
      } else {
        item.expand = true;
        this._openedItems.push(item);
      }
    }
  }

  private _initializeData(data: any[]): void {
    const hasDataSource = Boolean(this._originalDataSource);
    let dataSource = data.map((item, index) => new TGridItem(item[this.idExpr], item, index));

    this._originalDataSource = [...dataSource];

    dataSource = this._sortService.initializeData(dataSource, this.sortColumn, this.sortDirection, this._originalDataSource);
    const filteredDataSource = this._filterService.initializeData(dataSource, this.columns, this._originalDataSource);
    if (hasDataSource) {
      dataSource = filteredDataSource;
    }

    if (this._selectedItems) {
      this._selectedItems.splice(0);
    }

    this._dataSource = dataSource;
  }

  private _getSortDirection(current: TGridSortDirection, key: string): TGridSortDirection {
    if (key !== this.sortColumn) {
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
