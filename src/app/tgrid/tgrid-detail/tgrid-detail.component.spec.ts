import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TgridDetailComponent } from './tgrid-detail.component';

describe('TgridDetailComponent', () => {
  let component: TgridDetailComponent;
  let fixture: ComponentFixture<TgridDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TgridDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TgridDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
