import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TGridComponent } from './tgrid.component';

describe('TgridComponent', () => {
  let component: TGridComponent;
  let fixture: ComponentFixture<TGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
