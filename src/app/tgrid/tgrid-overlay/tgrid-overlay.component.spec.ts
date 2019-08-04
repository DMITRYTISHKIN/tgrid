import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TgridOverlayComponent } from './tgrid-overlay.component';

describe('TgridOverlayComponent', () => {
  let component: TgridOverlayComponent;
  let fixture: ComponentFixture<TgridOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TgridOverlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TgridOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
