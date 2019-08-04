import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { TGridFilter } from '../models/tgrid-filter';

@Component({
  selector: 'app-tgrid-filter',
  templateUrl: './tgrid-filter.component.html',
  styleUrls: ['./tgrid-filter.component.scss']
})
export class TgridFilterComponent implements OnInit {
  @Output() applyFilter: EventEmitter<TGridFilter[]>;
  @Output() resetFilter: EventEmitter<void>;
  @Input() dataSource: TGridFilter[];

  constructor(
    public elementRef: ElementRef
  ) {
    this.applyFilter = new EventEmitter<TGridFilter[]>();
    this.resetFilter = new EventEmitter<void>();
  }

  ngOnInit() {
    console.log(this.dataSource);
  }

  public onApply(): void {
    this.applyFilter.emit(this.dataSource);
  }

  public onReset(): void {
    this.dataSource.forEach(item => item.checked = false);
    this.resetFilter.emit();
  }

  public onChange(e: any, key: string): void {
    this.dataSource.find(item => item.key === key).checked = e.currentTarget.checked;
    console.log(this.dataSource);
  }

}
