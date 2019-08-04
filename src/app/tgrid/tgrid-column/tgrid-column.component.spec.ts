import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TgridColumnComponent } from './tgrid-column.component';

describe('TgridColumnComponent', () => {
  let component: TgridColumnComponent;
  let fixture: ComponentFixture<TgridColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TgridColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TgridColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
