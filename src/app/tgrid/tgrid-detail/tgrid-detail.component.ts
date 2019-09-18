import { Component, OnInit, Input, TemplateRef, AfterContentInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { TGridItem } from '../models/tgrid-item';
import { TGridComponent } from '../tgrid.component';

@Component({
  selector: 'app-tgrid-detail',
  templateUrl: './tgrid-detail.component.html',
  styleUrls: ['./tgrid-detail.component.scss'],
  animations: [
    trigger('detail', [
      state('inactive', style({
        height: 0,
        transform: 'translateY(-8px)',
        opacity: 0,
        overflow: 'hidden',
      })),
      state('active', style({
        height: '*',
        opacity: 1
      })),
      transition('inactive => active', animate('150ms ease-in')),
      transition('active => inactive', animate('150ms ease-out'))
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TGridDetailComponent implements OnInit, AfterContentInit, OnDestroy {
  public detail = 'inactive';
  public collapsed: boolean;

  @Input() detailTemplate: TemplateRef<any>;
  @Input() item: TGridItem;
  @Input() parent: TGridComponent;

  constructor(
    private _changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    if (!this.parent.detailClosed) {
      this.parent.detailClosed = false;
      this.detail = 'active';
      this._changeDetectorRef.detectChanges();
      return;
    }
  }

  ngOnDestroy() {
    this.item.detail = null;
    this.parent = null;
  }

  ngAfterContentInit() {
    this.item.detail = this;
    setTimeout(() => {
      this.detail = 'active';
      this.parent.detailClosed = false;
      this._changeDetectorRef.detectChanges();
    }, 0);
  }

  public collapse(): void {
    this.collapsed = true;
    this.detail = 'inactive';
    this._changeDetectorRef.detectChanges();
  }

  public endAnimation() {
    if (this.collapsed) {
      this.item.expand = false;
    }
  }

}
