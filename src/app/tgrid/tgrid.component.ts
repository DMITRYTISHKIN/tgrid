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
  TemplateRef
} from '@angular/core';
import { TGridColumnComponent } from './tgrid-column/tgrid-column.component';
import { TGridSortDirection } from './models/tgrid-sort-direction';
import { TGridItem } from './models/tgrid-item';
import { TGridSelectMode } from './models/tgrid-select-mode';
import { TGridFilter } from './models/tgrid-filter';
import { TGridFilterService } from './tgrid-filter.service';
import { TGridSortService } from './tgrid-sort.service';

@Component({
  selector: 'app-tgrid',
  templateUrl: './tgrid.component.html',
  styleUrls: ['./tgrid.component.scss'],
  providers: [
    TGridFilterService,
    TGridSortService
  ]
})
export class TGridComponent implements OnInit, OnChanges, AfterViewInit {
  @ContentChildren(TGridColumnComponent) columns: QueryList<TGridColumnComponent>;
  @ViewChild('filterContainer', { static: false, read: ViewContainerRef }) filterContainer: ViewContainerRef;

  @Input() dataSource: any[];
  @Input() idExpr = 'id';
  @Input() sortColumn: string;
  @Input() sortDirection: TGridSortDirection = TGridSortDirection.None;
  @Input() selectMode: TGridSelectMode = TGridSelectMode.None;
  @Input() singleDetail = true;
  @Input() height: string;
  @Input() perPage = 20;
  @Input() detailTemplate: TemplateRef<any>;

  @Output() sortChange: EventEmitter<TGridSortDirection> = new EventEmitter();
  @Output() selectionChange: EventEmitter<TGridItem[]> = new EventEmitter();

  public _dataSource: TGridItem[];
  public pagerDataSource: TGridItem[];
  public pagerStart: number;
  public pagerEnd: number;

  private _originalDataSource: TGridItem[];
  private _selectedItems: TGridItem[] = [];
  private _openedItems: TGridItem[] = [];

  constructor(
    private _filterService: TGridFilterService,
    private _sortService: TGridSortService,
  ) {}

  ngOnInit() {
    if (this.perPage) {
      this.pagerStart = 0;
      this.pagerEnd = this.perPage - 1;
    }
  }

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
    this.pagerStart = (page - 1) * (this.perPage - 1);
    this.pagerEnd = this.pagerStart + (this.perPage - 1);
  }

  public onClickColumn(e: MouseEvent, column: TGridColumnComponent): void {
    if (column.allowSort) {
      this._applySort(column);
    } else if (column.allowFilter) {
      this._applyFilter(e, column);
    }
  }

  public onClickRow(item: TGridItem, index: number): void {
    if (this.selectMode !== TGridSelectMode.None) {
      this.selectRow(item);
    }

    if (this.detailTemplate) {
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

  private _applySort(column: TGridColumnComponent): void {
    this.columns.forEach((item) => (item.sort = TGridSortDirection.None));
    this.sortDirection = this._sortService.getSortDirection(this.sortDirection, column.key, this.sortColumn);
    this.sortColumn = column.key;
    column.sort = this.sortDirection;

    this._dataSource = this._sortService.applySort(this._dataSource, this.sortColumn, this.sortDirection, this._filterService.data);
    this._sortService.data = this._sortService.applySort(
      this._sortService.data,
      this.sortColumn,
      this.sortDirection,
      this._originalDataSource
    );
  }

  private _applyFilter(e: MouseEvent, column: TGridColumnComponent): void {
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

}
