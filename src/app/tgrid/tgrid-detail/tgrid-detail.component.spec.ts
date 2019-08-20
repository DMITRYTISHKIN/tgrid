import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TGridDetailComponent } from './tgrid-detail.component';

describe('TGridDetailComponent', () => {
  let component: TGridDetailComponent;
  let fixture: ComponentFixture<TGridDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TGridDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TGridDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
