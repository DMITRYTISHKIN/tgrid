import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TgridComponent } from './tgrid.component';

describe('TgridComponent', () => {
  let component: TgridComponent;
  let fixture: ComponentFixture<TgridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TgridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
