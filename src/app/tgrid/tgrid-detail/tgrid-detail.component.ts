import { Component, OnInit, Input, TemplateRef, AfterContentInit, OnDestroy } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { TGridItem } from '../models/tgrid-item';

@Component({
  selector: 'app-tgrid-detail',
  templateUrl: './tgrid-detail.component.html',
  styleUrls: ['./tgrid-detail.component.scss'],
  animations: [
    trigger('detail', [
      state('inactive', style({
        height: 0,
        overflow: 'hidden',
      })),
      state('active', style({
        height: '*'
      })),
      transition('inactive => active', animate('150ms ease-in')),
      transition('active => inactive', animate('150ms ease-out'))
    ])
  ]
})
export class TGridDetailComponent implements OnInit, AfterContentInit, OnDestroy {
  public detail = 'inactive';

  @Input() detailTemplate: TemplateRef<any>;
  @Input() item: TGridItem;

  constructor() { }

  ngOnInit() { }

  ngOnDestroy() {
    this.item.detail = null;
  }

  ngAfterContentInit() {
    this.item.detail = this;
    setTimeout(() => {
      this.detail = 'active';
    }, 0);
  }

  public collapse(callback: () => void): void {
    this.detail = 'inactive';
    setTimeout(callback, 150);
  }

}
