import { Component, OnInit, Input, TemplateRef, ViewChild } from '@angular/core';
import { TGridSortDirection } from '../models/tgrid-sort-direction';
import { TGridFilter } from '../models/tgrid-filter';

@Component({
  selector: 'app-tgrid-column',
  templateUrl: './tgrid-column.component.html',
  styleUrls: ['./tgrid-column.component.scss']
})
export class TgridColumnComponent implements OnInit {
  @ViewChild('default', { static: true }) default: TemplateRef<any>;

  @Input() key: string;
  @Input() name: string;
  @Input() sort: TGridSortDirection = TGridSortDirection.None;
  @Input() allowSort: boolean;
  @Input() allowFilter: boolean;
  @Input() template: TemplateRef<any> = this.default;

  public filter: TGridFilter[] = [];


  constructor() { }

  ngOnInit() {}
}
