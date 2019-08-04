import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TgridFilterComponent } from './tgrid-filter.component';

describe('TgridFilterComponent', () => {
  let component: TgridFilterComponent;
  let fixture: ComponentFixture<TgridFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TgridFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TgridFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
