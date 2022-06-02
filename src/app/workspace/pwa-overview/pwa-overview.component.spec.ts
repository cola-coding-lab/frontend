import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PwaOverviewComponent } from './pwa-overview.component';

describe('PwaOverviewComponent', () => {
  let component: PwaOverviewComponent;
  let fixture: ComponentFixture<PwaOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PwaOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PwaOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
